
let express = require ("express")
let app =express()
let mongoose = require("mongoose")

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Project").then((req,res)=>{
    console.log("connected to mongodob");
}).catch((errr)=>{
    console.log("error");
})

let ProjectSchema = mongoose.Schema({
    
   
    name :{
        type:String
    },
    age :{
        type :Number
    },
    email:{
        type :String
    },
    add :{
        type :String
    },
   
})

let ProjectModel = mongoose.model("Admin", ProjectSchema)

/// Create

app.post("/create/project",async(req,res)=>{

    let {name,age,email,add}= req.body

    let newProject = await new ProjectModel({name,age,email,add})
    await newProject.save()
    console.log(newProject);
    res.send(`Code running on port no 1200 ${newProject}`)
})

///Read 

app.get("/read/query",async (req,res)=>{

    let {age}=req.query

    let readquery = await ProjectModel.findOne({age})
    res.send(readquery)
    console.log(readquery);
})

app.post("/update/project",async (req,res)=>{
    let {id}= req.query
    let {name,age,email,add}= req.body

    let updateData = await ProjectModel.findOneAndUpdate({_id :id},{name,age,email,add},{new:true})
    res.send(updateData)
    console.log(updateData);

})
app.delete("/delete/project",async(req,res)=>{

    let {id}=req.query

    let deletepr = await ProjectModel.deleteOne({_id:id})
    res.send(deletepr)
    console.log(deletepr);
})



app.listen(1200)