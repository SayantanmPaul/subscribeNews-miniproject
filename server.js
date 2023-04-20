const express= require('express')
const request= require('request')
const bodyParser=require('body-parser')

const app=express()

app.use('/public', express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname+ '/index.html')
})

app.listen(3000, function(req,res){
    console.log('server live on 3000');
})