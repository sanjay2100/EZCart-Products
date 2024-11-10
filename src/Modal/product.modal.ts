import mongoose from "mongoose";


const ProductSchema=new mongoose.Schema({
    name:{required:true,type:String},
    price:{required:true,type:Number},
    description:{required:true,type:String},
    category:{required:true,type:String},
    quantity:{required:true,type:Number},
    images:{type:[Object],required:false},
    user_id:{required:true,type:String}
})


export default  mongoose.model('Product',ProductSchema)