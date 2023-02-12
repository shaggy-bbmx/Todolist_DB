const express=require("express");
const bodyparser=require("body-parser");
const { urlencoded } = require("body-parser");
const app=express();
const _ = require('lodash');

const date=require(__dirname +"/support.js");
console.log(date);

const mongoose=require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/listDB');
mongoose.connect("mongodb+srv://shagy_du:shagy_du@cluster0.vaenog8.mongodb.net/listDB",{useNewUrlParser:true});


const listSchema=new mongoose.Schema({
  name:String
});


// const itemList=mongoose.model("itemList",listSchema);
let itemList;
// const workItemList=mongoose.model("workItemList",listSchema);


app.set("view engine","ejs");
app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
    console.log("server 3000 is ON");
});

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  itemList=mongoose.model("itemList",listSchema);
  
  
  itemList.find((err,items)=>{
    if(err)console.log(err);
    else{ 
      if(items.length==0){
        const item1=new itemList({
          name:"Welcome to list"
        });
        
        const item2=new itemList({
          name:"Hit + sign to add items"
        });
        
        const item3=new itemList({
          name:"Hit this to delete items"
        });
        
        const defaultItems=[item1,item2,item3];
        
        itemList.insertMany(defaultItems,function(err){
          if(err)console.log(err);
          else console.log("DB is Ok");
        });
        
        res.redirect("/");
      }else res.render("list",{listTitle :"Today",newListItems:items});
    }
  }); 

});

app.get("/type/:listType",(req,res)=>{
  const listType=req.params.listType;
  itemList=mongoose.model(listType,listSchema);
 
  itemList.find((err,items)=>{
    if(err)console.log(err);
    else{ 
      if(items.length==0){
        const item1=new itemList({
          name:"Welcome to "+_.capitalize(listType)+" list"
        });
        
        const item2=new itemList({
          name:"Hit + sign to add items"
        });
        
        const item3=new itemList({
          name:"Hit this to delete items"
        });
        
        const defaultItems=[item1,item2,item3];
        
        itemList.insertMany(defaultItems,function(err){
          if(err)console.log(err);
          else console.log("DB is Ok");
        });
        
        if(req.params.listType=="Today")res.redirect("/");     
        else res.redirect("/type/"+req.params.listType);
      }else res.render("list",{listTitle :listType,newListItems:items});
    }
  }); 


});


app.post("/type/:listType",(req,res)=>{
    
  let itemName=req.body.tasklist;
    
  const newItem=new itemList({
    name:itemName
  });
  newItem.save();
  if(req.params.listType=="Today")res.redirect("/");     
  else res.redirect("/type/"+req.params.listType);

});



app.post("/delete/:listType",(req,res)=>{
  const itemName=req.body.checked;
  itemList.deleteOne({name:itemName},(err,result)=>{
    if(err)console.log(err);
  });
  if(req.params.listType=="Today")res.redirect("/");     
  else res.redirect("/type/"+req.params.listType);

});

