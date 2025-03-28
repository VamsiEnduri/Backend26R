const express=require("express");
const app=express();
const axios=require("axios")

const PORT=6000;

app.get("/products",async(req,res)=>{
    let finalDta=[]
   try{
    await  axios.get("https://jsonplaceholder.typicode.com/albums").then(response=>{
        finalDta= response.data
         
         } ).catch(err=>{
            console.log(err)
         })
   }
   catch(err){
       res.writeHead(500,{"content-type":"application/json"})
       return res.end()
   }
   res.writeHead(200,{"content-type":"application/json"})
    res.write(JSON.stringify(finalDta))
    return res.end()
    
})

app.listen(PORT,()=>{
    console.log("server running on port 6000")
})

