var express=require("express");
var app=express();
var http=require("http");
var port=process.env.PORT||8080;
    app.use(express.static("view"));
app.get('/',function(req,res){
    res.send('hello!!!');

   // res.sendFile('view/index.html');
})
app.get('/:dateString',function(req,res){
        var myDate=req.params.dateString;
        var unix=null;
        var natural=null;
        if(myDate.isNaN==="true"){
            if(/^\d{8,}$/.test(myDate)) {
                unix=myDate.format("X");
                natural=unixToNat(unix);
             }
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
    function natToUnix(nat){
        var unixtime=Date.parse(nat).getTime()/1000;
        return unixtime;
    }
http.createServer(app).listen(port);