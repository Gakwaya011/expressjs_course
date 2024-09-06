const express = require('express')
const {UserTable} = require('./models')
const app = express();
const path = require('path');
const { title } = require('process');
const bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.json());
app.use(bodyParser.json());
let posts =[
    {id:1,title:'Post One'},
    {id:2,title:'Post Two'},
    {id:3,title:'Post Three'},
]

app.get('/api/posts',(req,res)=>{
    res.json(posts)

})
app.get('/users', async (req,res) =>{
    try{
        const users = await UserTable.findAll();
        res.json(users);
    } catch(error) {
        res.status(500).json({error:error.message})
    }
});
app.post('/users', async (req,res) => {
    const {name,email} = req.body;
    try{
        const newUser = await UserTable.create({name, email});
        res.status(201).send(newUser);
    } catch(error){
        res.status(500).send({error:error.message});
    }
});
app.listen(3000,() => console.log("server is running on port 3000"))

