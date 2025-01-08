const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoModel = require("./Models/todoModel");

const app = express();
app.use(cors());
app.use(express.json());
const PORT =3000;

mongoose.connect('mongodb://0.0.0.0:27017/TodoApp');

app.get('/get', (req, res)=>{
   todoModel.find()
   .then(result => res.json(result))
   .catch(err => res.json(err)) 
})

app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) =>{
   const task = req.body.task;
   todoModel.create({
    task: task
   }).then(result => res.json(result))
   .catch(err => res.json(err))
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
} )