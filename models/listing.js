const mongoose=require('mongoose');

const listingSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1745872261239-695afa75aa10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
        set:(v)=>v===""? "https://images.unsplash.com/photo-1745872261239-695afa75aa10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8": v,
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;