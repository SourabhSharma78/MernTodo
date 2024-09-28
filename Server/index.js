const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Todos = require("../Server/models/todoSchema");

const dbUrl = "mongodb://localhost:27017/todomern"; 

async function main() {
    await mongoose.connect(`${dbUrl}`);
}

main().then(() => {
    console.log("DB Connected Successfully");
}).catch((err) => {
    console.log(err);
});

// Middleware setup
app.use(cors());
app.use(express.json()); // Correctly apply express.json middleware

// POST endpoint to add a task
app.post("/add", async(req, res) => {
   try{
    const task = req.body;
    const newtodo = new Todos(req.body);
    await newtodo.save();
    return res.status(201).send({message : "task added to db" });
   }
   catch(err){
    console.log(err);
   }
    
});

app.put("/cmpltupdt/:id" , async(req,res) => {
   try{
    prvres = await Todos.findById(req.params.id);
    if(!prvres.completed){
        response = await Todos.findByIdAndUpdate( req.params.id , {completed : true} );
    }
    else{
        response = await Todos.findByIdAndUpdate( req.params.id , {completed : false} );
    }
    
    return res.status(201).send({message : "completed status changed ." , response});
   }
   catch(err){
    console.log(err);
   }
});

app.get("/show",async(req,res) => {
    const response = await Todos.find({});
    res.send(response);
})

app.delete("/delete/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const response = await Todos.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Item not found');
          }
        res.status(200).send({ message: 'Item deleted successfully' });
    }
    catch(err){
        res.status(500).send({error : "Failed to delete Task ."});
    }
})

// Start server
app.listen(8080, () => { 
    console.log("Server Running on port 8080"); 
});