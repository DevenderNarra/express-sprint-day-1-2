const express=require("express")

const app=express()
const short = require('short-uuid');
app.use(express.json())

const fs=require("fs")
const readData=fs.readFileSync("./data.json","utf-8")
const userData=JSON.parse(readData)

app.get("/users",function(req,res){
    let message=""
    if(userData.length===0){
        message="No user Found"
    }else{
        message=userData
    }
    res.status(200).json({
        status:"successs",
        message,
    })
})

app.post('/users',function(req,res){
    const shortId=short.generate();
    const userDetails=req.body;
    userDetails.id=shortId;
    userData.push(userDetails)
    const updatedData=JSON.stringify(userData)
    console.log(updatedData)
    fs.writeFile("./data.json", updatedData, (err) => {
        if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({
                status: "error",
                message: "Could not add user"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User added successfully"
        });
    });
})

app.get("/users/:userId/",function(req,res){
    const userId=req.params.userId;
    console.log(userId)
    const userDetails=getUserById(userId)
    res.status(200).json({
        status:"success",
        message:userDetails,
    })
})

function getUserById(id){
  const user=userData.find((user)=>{
    return user.id==id
  })

  if(user==undefined){
    return "No user Found"
  }else{
    return user
  }
}

app.use(function cb(req,res){
    res.status(200).json({
        "status":"success",
        "message":"I got request"
    })
})

app.listen(3000,()=>{
    console.log("server running at 3000")
})