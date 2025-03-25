const http=require("http")
const { json } = require("stream/consumers")
const url=require("url")

let data=[{id:1,name:"dell",cat:"laptop", color:"silver"},{id:2,name:"hp",cat:"laptop", color:"silver"},{id:3,name:"vivo",cat:"mobile", color:"blue"},{id:4,name:"redMI",cat:"laptop", color:"black"}]

const server=http.createServer((req,res)=>{
    
    const parsedUrl=url.parse(req.url,true)
    const pathName=parsedUrl.pathname;
    const query=parsedUrl.query;

    if(pathName === "/"){
      res.writeHead(200,{"Content-Type":"text/plain"})
      res.write("wlecome to 4000 port and you can explore now")
      return res.end()
    }else if(pathName === "/products"){
        if(req.method === "GET"){

            if(query.id){
                 res.writeHead(200,{"Content-Type":"application/json"});
                 data=data.filter((x)=>x.id === Number(query.id))
                 res.write(JSON.stringify(data))
                 return res.end()
            }
            res.writeHead(200,{"Content-Type":"application/json"})
      res.write(JSON.stringify(data))
      return res.end()
        }else if(req.method === "DELETE"){
            if(query.id){
                 res.writeHead(200,{"Content-Type":"application/json"});
                 data=data.filter((x)=>x.id !== Number(query.id))
                 res.write(JSON.stringify(data))
                 return res.end()
            }
        }else if(req.method === "POST"){
             let body="";
             req.on("data",(chunk)=>{
                 body += chunk
                 console.log(body,"body insode the req.on")
             })
            
            req.on("end",()=>{
                let dataPost=JSON.parse(body);
                res.writeHead(201,{"Content-Type":"application/json"})
                res.write(JSON.stringify({message:"new item added to products",dataPost}))
                return res.end()
            })

             
        }else if(req.method === "PUT"){
            let body=""
            req.on("data",(chunk)=>{
                body +=chunk;
            })

            req.on("end",()=>{
                let putData=JSON.parse(body)
                res.writeHead("201",{"Content-Type":"application/json"});
                res.write(JSON.stringify({message:"updated successfully",putData}))
                return res.end()
            })
        }
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"})
      res.write("no any route found")
      return res.end()
    }
// res.end("hello welcome to 4000 port ")

})
server.listen(4000,()=>{
    console.log("serevr running on http://localhost:4000")
})