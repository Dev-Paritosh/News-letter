const express=require("express");
const bodyParser=require("body-parser");
const request =require("request");
const { log } = require("console");
const https=require("https");
const { reverse } = require("dns");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const secondName=req.body.lName;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:secondName
                }
            }
        ]

    }

    const jsonData=JSON.stringify(data);
    const url="https://us6.api.mailchimp.com/3.0/lists/a61d652ed6";

const options={
    method:"POST",
    auth:"paritosh:ec4f27dbfdc3101b802f8090830e1017-us6"
}

   const request= https.request(url,options, function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");//send file instead
    }
    else{
        res.sendFile(__dirname+"/faliure.html");//send file instead
    }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/faliure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT,function(){//change
    console.log("running");
});


// ec4f27dbfdc3101b802f8090830e1017-us6
// a61d652ed6