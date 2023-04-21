const express= require('express')
const bodyParser=require('body-parser')
const https= require('https')

const app=express()
//set bodyparese to get the data from html
app.use(bodyParser.urlencoded({extended: true}))

//used to set the public folder static to load the css and imgs
app.use('/public', express.static('public'));

//basic get request to the main html page
app.get('/', function(req,res){
    res.sendFile(__dirname+ '/index.html')
})

//handle the post req from the html from
app.post('/', function(req,res){
    const name= req.body.fullname;
    const emailID= req.body.email;
    const data={
        members:[
            {
                email_address: emailID,
                status: 'subscribed',
                merge_fields: {
                    FNAME: name
                }
            }

        ]
    };

    //data in a single line format
    const jsonData= JSON.stringify(data)

    //api route page
    const url='https://us21.api.mailchimp.com/3.0/lists/e67bff0159'

    const options={
        method: 'POST',
        auth: "subscription:226c2c680be31b6618cfa9dcffde3162-us21"
    }

    //after submitting form redirect
    const request= https.request(url, options, function(response){

        if(response.statusCode ==200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }

        response.on("data", function(data){
            console.log(JSON.parse(data ));
        })
    })

    request.write(jsonData);
    request.end();
})

// back to the main html page
app.post("/failure", function(req,res){
    res.redirect('/')
})

app.listen(3000, function(req,res){
    console.log('server live on 3000');
})


// api key:

// 226c2c680be31b6618cfa9dcffde3162-us21

//e67bff0159 