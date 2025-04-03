const express=require("express");
const mainRouter=require("./routes")
const cors=require("cors")

const app=express();

app.use(express.json()) // it will parse the incoming req data (post,put)
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use("/api",mainRouter)


app.listen(4000,()=>{
    console.log("server running")
})