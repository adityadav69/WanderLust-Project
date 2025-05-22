const express=require('express');
const app=express();
const mongoose=require('mongoose');

const MONGO_URL="mongodb://localhost:27017/wanderlust";
const port=8080;

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("DB Connected Successfully");
})
.catch((err)=>{
    console.log("DB Connection Failed");
})



app.get('/',(req,res)=>{
    res.send("Root working..");
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})