import { Request, Response } from "express";
import categoryModal from "../Modal/category.modal";



export const CreateCategory=async(req:Request,res:Response)=>{
    try{
        const category=new categoryModal({
            name:req.body.name
        })

        await category.save();
        res.json({message:"Category created successfully"}).status(200)
    }
    catch(error:any){
        res.json({error:"Internal serever error",err:error})
    }
}


export const GetAllCategory=async(req:Request,res:Response)=>{
    try{
        const categories=await categoryModal.find()
        res.json(categories).status(200)
    }
    catch(error:any){
        res.json({error:'Internal server error',err:error.message})
    }
}