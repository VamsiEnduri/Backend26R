const path=require("path")
console.log(path)

const tenKCoders=path.join("world","asia","india","Telangana","Rangaredy","hyd","KPHB","RoadNo1")
console.log(tenKCoders)


const tenKCodersResolve=path.resolve("world","asia","india","Telangana","Rangaredy","hyd","KPHB","RoadNo1")
console.log(tenKCodersResolve)

const userBaseName=path.basename("/path/index.js",".html")
const userBaseName2=path.basename("../../../Js@19R/fun@day2/fun.html","")
console.log(userBaseName)
console.log(userBaseName2)

const dir=path.resolve(path.dirname("../Crud_json/node_modules/nodemon/lib/monitor/index.js"))
console.log(dir)





const ext=path.extname("../../19R@10k/JavaScript/BasicJS_Projects/cal/index.html")

// const onluExt=ext.split(".");
// const finalExt=onluExt[1];
// console.log(finalExt,"final extname")
// console.log(onluExt)
// console.log(ext)


const parsedPath=path.parse("crud@2/node_modules/anymatch/index.js")
console.log(parsedPath);
console.log(parsedPath);

const isAb=path.isAbsolute("C:/26React/day2/src/Forms/Login/Login.js");
console.log(isAb,"37")



const formattedPath = path.format({
    dir: 'crud@2/node_modules/anymatch/',
    base:"index.js",
    name: 'index',
    ext: '.js'
  });

  console.log(formattedPath)

  console.log(__dirname ,"50 line")
  console.log(__filename,"51 line")

// const 
req.on("data",()=>{

})
req.on("end",()=>{

})