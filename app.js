const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();



// Set up Mailchimp API key and server
mailchimp.setConfig({
    apiKey: "e1f76cb39f21d506fecf2d0b248f307c-us21",
    server: "us21",
});


// Serve static files from the public directory
app.use(express.static("public"));


// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({extended : true}));

// Serve the signup page on the root path
app.get('/' , function(req,res){

    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){
    const first_name = req.body.nf  ;
    const last_name = req.body.ln  ;
    const email =  req.body.email  ;
    const listId = "7a97781e06";
 
async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: first_name ,
      LNAME: last_name ,
    }
  });
 
  if (res.statusCode == 200 ){
    res.sendFile(__dirname + "/success.html");
  }

}
 
run();
 console.log(res.statusCode);
});














app.listen(3000 , function(){
    console.log('listening on port 3000');
})

// API KEY

// e1f76cb39f21d506fecf2d0b248f307c-us21

// LIST ID

// 7a97781e06