const express=require("express");
const mainRouter=require("./routes")

const app=express();

app.use(express.json()) // it will parse the incoming req data (post,put)
app.use(express.urlencoded({extended:true}))


app.use("/",mainRouter)
app.use("/",mainRouter)


app.listen(4000,()=>{
    console.log("server running")
})


// app.get("/users",(req,res)=>{
//    let data= readDataFile()
//    console.log("data in api",data)
//    res.writeHead(200,{"content-type":"application/json"})
//    res.write(JSON.stringify(data.users))
//   return res.end()   
// })




// app.get("/users/:name",(req,res)=>{
//          console.log(req.params.name,"path param name")
//          let userName=req.params.name;
//          let data=readDataFile();
//         //  console.log(req.params)
//          const userFound=data.users.filter((x)=>x.name === userName)
//          console.log(userFound)
//          res.write(JSON.stringify(userFound))
//          return res.end()
// })

// app.get("/admins/:name",(req,res)=>{
//     console.log(req.params.name,"path param name")
//     let userName=req.params.name;
//     let data=readDataFile();
//    //  console.log(req.params)
//     const userFound=data.admins.filter((x)=>x.name === userName)
//     console.log(userFound)
//     res.write(JSON.stringify(userFound))
//     return res.end()
// })

// app.delete("/admins/:name",(req,res)=>{
//     let name=req.params.name;
//     let data=readDataFile();

//     let adminsCount=data.admins.length;

//     data.admins=data.admins.filter((x)=>x.name !== name)

//     if(adminsCount === data.admins.length){
//         return res.end ("user not found to dleete with that name")
//     }
//     writeDataFile(data)
//     res.writeHead(200,{"content-type":"application/json"})
//     res.write(JSON.stringify({message:"admin dleteed successfully!!"}))
//     return res.end()

// })

// app.delete("/users/:name",(req,res)=>{
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


