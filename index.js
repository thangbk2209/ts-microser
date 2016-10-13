var express=require("express");
var app=express();
var http=require("http");
var path = require('path');
var port=process.env.PORT||8080;
// app.set('views', path.join(__dirname, '../view'));
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "view")));
// app.get('/', express.static(path.join(__dirname, "view")));
// app.get('/',function(req,res){
    // res.send('hello!!!');
    // res.render('index');

  // res.sendFile('view/index.html');
// })
app.get('/:dateString',function(req,res){
        var myDate=req.params.dateString;
        var unix=null;
        var natural=null;
        if(isNaN(myDate)){
                natural=myDate;
                var time=convertNat(myDate);
                unix=natToUnix(myDate);
        }
         else{
             unix=myDate;
             natural=unixToNat(myDate);
         }
        var results={"unix":unix,"natural":natural};
        res.send(results);
    })
    function unixToNat(unixtime){
        var a=new Date(unixtime*1000);
        var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year=a.getFullYear();
        var month=months[a.getMonth()];
        var date=a.getDate();
        var kq=month+' '+date+','+' '+year;
        return kq;
    }
    function convertNat(nat){
        var na="December 15, 2015";
        var nat=na.split(" ");
        console.log(nat);
        var months={"Juanuary":"1", "February":"2", "March":"3", "April":"4", "May":"5", "June":"6", "july":"7", "August":"8", "September":"9", "October":"10", "November":"11", "December":"12"};
        console.log(months);
        var mm=12;
        console.log(mm);
        console.log(nat[1]);
        var dleng=nat[1].length;
        var dd=nat[1].slice(0,dleng-1);
        console.log(nat);
        console.log(dleng);
        var natural=nat[2]+"."+mm+"."+dd;
        console.log(natural);
        return natural;
    }
    function natToUnix(nat){
        var unixtime=(new Date(nat).getTime())/1000;
        return unixtime;
    }
http.createServer(app).listen(port);