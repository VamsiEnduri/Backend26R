const express=require("express");
const fs=require("fs");

const app=express();

app.use(express.json()) // json format data use 


function readDataFile(){
   const data= JSON.parse(fs.readFileSync("data.json","utf-8"))
   console.log(data)
   return data
}

function writeDataFile(data){
     fs.writeFileSync("data.json",JSON.stringify(data))
}

app.get("/users",(req,res)=>{
   let data= readDataFile()
   console.log("data in api",data)
   res.writeHead(200,{"content-type":"application/json"})
   res.write(JSON.stringify(data.users))
  return res.end()   
})

app.get("/admins",(req,res)=>{
    let data= readDataFile()
   console.log("data in api",data)
   res.writeHead(200,{"content-type":"application/json"})
   res.write(JSON.stringify(data.admins))
  return res.end()   
})

app.post("/users",(req,res)=>{
    let {name,age,role,info} =req.body;
    console.log(name,info,"req post data")

    let data=readDataFile();
    let newUser={userId:Date.now(),name, age, role, info}
    if(role === "user"){
        data.users.push(newUser)
    }else{
        data.admins.push(newUser)
    }
    writeDataFile(data)
    res.writeHead(201,{"content-type":"application/json"})
    res.write(JSON.stringify(newUser))

    return res.end()
})

app.get("/users/:name",(req,res)=>{
         console.log(req.params.name,"path param name")
         let userName=req.params.name;
         let data=readDataFile();
        //  console.log(req.params)
         const userFound=data.users.filter((x)=>x.name === userName)
         console.log(userFound)
         res.write(JSON.stringify(userFound))
         return res.end()
})

app.get("/admins/:name",(req,res)=>{
    console.log(req.params.name,"path param name")
    let userName=req.params.name;
    let data=readDataFile();
   //  console.log(req.params)
    const userFound=data.admins.filter((x)=>x.name === userName)
    console.log(userFound)
    res.write(JSON.stringify(userFound))
    return res.end()
})

app.delete("/admins/:name",(req,res)=>{
    let name=req.params.name;
    let data=readDataFile();

    let adminsCount=data.admins.length;

    data.admins=data.admins.filter((x)=>x.name !== name)

    if(adminsCount === data.admins.length){
        return res.end ("user not found to dleete with that name")
    }
    writeDataFile(data)
    res.writeHead(200,{"content-type":"application/json"})
    res.write(JSON.stringify({message:"admin dleteed successfully!!"}))
    return res.end()

})

app.delete("/users/:name",(req,res)=>{
    let name=req.params.name;
    let data=readDataFile();

    let usersCount=data.users.length;

    data.users=data.users.filter((x)=>x.name !== name)

    if(usersCount === data.users.length){
        return res.end ("user not found to dleete with that name")
    }
    writeDataFile(data)
    res.writeHead(200,{"content-type":"application/json"})
    res.write(JSON.stringify({message:"user dleteed successfully!!"}))
    return res.end()

})



app.listen(4000,()=>{
    console.log("server running")
})