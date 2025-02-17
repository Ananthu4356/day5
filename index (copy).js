// 1. importing the express
const express = require('express')
const createApplication = require('express/lib/express')
const employeeModel = require("./model")
const cors = require('cors')

// 2. initialization
const app = new express()

// middleware || parsing the parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

// 3.api creation
app.get('/',(req,res)=>{
    res.send("aly")
})

app.get('/ananthu',(req,res)=>{
    res.send("this message is tutorial")
})

app.get('/data',(req,res)=>{
    res.json(
        {
        "name":"ananthu",
        "age":19
        }
    ) 
})
// api for adding data
app.post('/create',async(req,res)=>{
    var result = await new employeeModel(req.body)
    result.save()
    res.send("Data Added")
})
// api for viewing data
app.get('/view',async(req,res)=>{
    var data = await employeeModel.find()
    res.json(data)
    console.log(data)
})

// api for deleting data
app.delete('/remove/:id',async(req,res)=>{
    console.log(req.params)
    let id = req.params.id
    await employeeModel.findByIdAndDelete(id)
    res.send("Deleted")
})
// api for uddating the data
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id
    await employeeModel.findByIdAndUpdate(id,req.body)
    res.send("Data Upadted")
})

// 4.port
app.listen(3005,()=>{
    console.log("port 3005 is up and running")
})