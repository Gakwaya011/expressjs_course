const express = require('express')
const app = express()
const port = 3000
app.get('/',(req,res)=>{
    res.send('hello world')
})

const testRoute = require('./routes/usertest');
const userRoutes = require('./routes/usertest'); // or './routes/usertest'
app.use(express.json());
app.use('/', testRoute);
app.use('/api/users', userRoutes);



app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})