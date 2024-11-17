import mongoose from "mongoose"


const CategorySchema=new mongoose.Schema({
    name:{
        type:"string",
        
        required:true
    },
    image:{
        type:[Object],
        require:true
    }
})


export default mongoose.model("category",CategorySchema)