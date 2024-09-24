const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// const port = 3000;

const userRoutes = require('./routes/usertest');
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use(express.json());

// app.use('/', testRoute);
app.use('/api', userRoutes);
module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
    });
}





// app.listen(port,()=>{
//     console.log(`app listening on port ${port}`)
// })