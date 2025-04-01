const express=require("express")
const fs=require("fs");
const router=express.Router()

function readDataFile(){
   const data= JSON.parse(fs.readFileSync("data.json","utf-8"))
   console.log(data)
   return data
}


function writeDataFile(data){
    fs.writeFileSync("data.json",JSON.stringify(data))
}

// get("/:name")
router.get("/users",(req,res)=>{
    let data= readDataFile()
    console.log("data in api",data)
    res.writeHead(200,{"content-type":"application/json"})
    res.write(JSON.stringify(data.users))
   return res.end()   
})

router.get("/admins",(req,res)=>{
    let data= readDataFile()
   console.log("data in api",data)
   res.writeHead(200,{"content-type":"application/json"})
   res.write(JSON.stringify(data.admins))
  return res.end()   
})




router.post("/users",(req,res)=>{
    let {name,age,role,info}=req.body;
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


    router.delete("/admins/:name",(req,res)=>{
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

// router.delete("/users/:name",(req,res)=>{
//     let name=req.params.name;
//     let data=readDataFile();

//     let usersCount=data.users.length;

//     data.users=data.users.filter((x)=>x.name !== name)

//     if(usersCount === data.users.length){
//         return res.end ("user not found to dleete with that name")
//     }
//     writeDataFile(data)
//     res.writeHead(200,{"content-type":"application/json"})
//     res.write(JSON.stringify({message:"user dleteed successfully!!"}))
//     return res.end()

// })

router.delete("/users/:userId",(req,res)=>{
    let id=parseInt(req.params.userId);
    console.log(id,"id from req.params")
    let data=readDataFile();

    let usersCount=data.users.length;

    data.users=data.users.filter((x)=>x.userId !== id)

    if(usersCount === data.users.length){
        return res.end ("user not found to dleete with that id")
    }
    writeDataFile(data)
    res.writeHead(200,{"content-type":"application/json"})
    res.write(JSON.stringify({message:"user dleteed successfully!!"}))
    return res.end()

})


router.put("/users/:name",(req,res)=>{
     let updatableName=req.params.name;
     let {userId,name,age,role,info}=req.body;
let data=readDataFile()
     let findIndex=data.users.findIndex(x=>x.name === updatableName);

     if(findIndex === -1){
        return res.end("user not found to update")
     }

     data.users[findIndex]={userId,name,age,role,info};
     writeDataFile(data)
     res.writeHead(200,{"content-type":"application/json"})
     res.write(JSON.stringify({message:"user updated successfully!!"}))
     return res.end()
})

// router.post


// router.put


// router.delete

module.exports=router;