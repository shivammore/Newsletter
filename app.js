const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
  console.log(res.statusCode);
})
app.post('/', function(request, res) {
  const fname = request.body.fname;
  const lname = request.body.lname;
  const email = request.body.email;
  const data = {
    members : [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/ae8b7ac63f";
  const options={
    method:"POST",
    auth:"shivammore:458d58f81e6d87f338544fa610894a2a-us2"
  };
  const response=https.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/sucess.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  response.write(jsonData);
  response.end();
})
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started at 3000")

})
