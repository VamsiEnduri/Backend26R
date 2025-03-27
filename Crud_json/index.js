// // // const http=require("http");
// // // const url=require("url");

// // // const server=http.createServer((req,res)=>{
// // //     let users=[]
    // const parsedUrl=url.parse(req.url,true);
    // const pathName=parsedUrl.pathname;
    // const query=parsedUrl.query;

    // if(pathName === "/users" &&req.method === "GET"){
    //       res.writeHead(200,{"Content-Type":"application/json"})
    //       res.write(JSON.stringify(users))
    //       return res.end()

    // }else if(pathName === "/users" &&req.method === "POST"){
    //     let body="";
    //     req.on("data",(chunk)=>{
    //              body +=chunk.toString()
    //     })
    //     req.on("end",()=>{
    //        let newUser=JSON.parse(body);
    //        res.writeHead(200,{"Content-Type":"application/json"})
    //        users=[...users,newUser]
    //        res.write(JSON.stringify({mesage:"new user added successfully !!",newUser}))
    //        return res.end()
           
    //     })
    // }
// // // })

// // // server.listen(4000,()=>{
// // //     console.log("serevr i srunning on port 4000")
// // // })




// // // fs module
// // const fs=require("fs");

// // fs.writeFile("data.json",JSON.stringify({id:1,name:"vamsi"}),(err)=>{
// //     if(err){
// //         return console.log("err",err)
// //     }
// //     console.log("file created succssfully!!!")
// // })

// // fs.readFile("data.json","utf-8",(err,data)=>{
// //     if(err){
// //         return console.log("err",err)
// //     }
// //     console.log(JSON.parse(data))
// // })
// // fs.appendFile("data.json",JSON.stringify({id:2,name:"ramu"}),(err)=>{
// //     if(err){
// //         return console.log("err",err)
// //     }
// //     console.log("new user added r appended successfully !!")
// // })

// // fs.unlink("data.json",(err)=>{
// //     if(err){
// //         return console.log("err",err)

// //     }
// //     console.log("dleted successfullu !!!")
// // })

// const fs=require("fs");

// fs.writeFileSync("data.json",JSON.stringify([]),(err)=>{
//     if(err){
//         return console.log(err)

//     }
//     console.log("file created successfully!!!")
// })

// fs.appendFileSync("data.json",JSON.stringify({id:1,name:"vamsi"}))



const http=require("http");
const url=require("url");
const fs=require("fs")


function readFile(){
    const data=fs.readFileSync("data.json","utf-8")
    return JSON.parse(data)
}

// readFile()

function writeFile(users){
    fs.writeFileSync("data.json",JSON.stringify(users),"utf-8")
}

const server=http.createServer((req,res)=>{
    const parsedUrl=url.parse(req.url,true);
    const pathName=parsedUrl.pathname;
    const query=parsedUrl.query;

    if(pathName === "/users" &&req.method === "GET"){
        res.writeHead(200,{"Content-Type":"application/json"})
       
        const users=readFile();
        // console.log(typeof users)

        res.write(JSON.stringify(users))
        return res.end("")
     

  }else if(pathName === "/users" &&req.method === "POST"){
      let body="";
      req.on("data",(chunk)=>{
               body +=chunk.toString()
      })
      req.on("end",()=>{
       let newUser=JSON.parse(body)
    //   
         res.writeHead(200,{"Content-Type":"application/json"})
          let users=readFile();
          users=[...users,newUser]
          newUser.id = users.length + 1;
          writeFile(users)
         res.write(JSON.stringify({mesage:"new user added successfully !!",newUser}))
         return res.end()
         
      })
  }
  else if(pathName === "/users" &&req.method === "DELETE"){

    if(query.id){
        let users=readFile();
        let filterUsers=users.filter((x)=>x.id !== Number(query.id))
        writeFile(filterUsers)
    }

    res.write(JSON.stringify({mesage:"item dleted successfully"}))
    return res.end()
 
  }

  else if(pathName === "/users" && req.method === "PUT"){
     let body ="";
     req.on("data",(c)=>{
        body+=c.toString()
     })
     req.on("end",()=>{
        let editUser=JSON.parse(body);
        let users=readFile();
        const id=users.findIndex((x)=>x.id ===Number(query.id))
        users[id]=editUser;
        writeFile(users)
        res.writeHead(201,{"Content-Type":"application/json"})
        res.write(JSON.stringify({mesage:"edited successfully!!!",editUser}))
        return res.end()
     })
  }
})
server.listen(4000,()=>{
    console.log("server running")
})


// const a=[1,2,4];
// a[2]="va,si"


// const a={
//     id:1,
//     name:"vamsi",
//     age:26,
//     role:"trainer"
// }

// a.age=27

// console.log(a)