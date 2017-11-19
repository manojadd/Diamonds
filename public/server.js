
const express = require('express');
const app = express();
const path = require('path');

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
})

app.use('/static',express.static(path.resolve('../build/static')));
app.use('/public',express.static(path.resolve('./')));




app.get('/',function(req,res){
	res.sendFile(path.resolve('../build/index.html'));
});


app.listen(3001,'0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})
