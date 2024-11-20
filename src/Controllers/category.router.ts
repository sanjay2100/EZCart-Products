import { Request, Response, response } from "express";
import categoryModal from "../Modal/category.modal";
import { CategoryType } from "../Types/categoryType";
const path=require('path')
import fs from 'fs/promises';



export const CreateCategory=async(req:Request,res:Response)=>{
    console.log(req);
    
    
    try{
    const images=req.file as Express.Multer.File
    const category=new categoryModal({
        name:req.body.name,
        images:[]
    })
    if (images) {
            const file = {
                fieldname: 'images',
                filename: images.filename,
                originalname: images.originalname,
                mimetype: images.mimetype,
                path: images.path,
            };
            category.image.push(file);
        
    }
        

        await category.save();
        res.json({message:"Category created successfully"}).status(200)
    }
    catch(error:any){
        res.json({error:"Internal serever error",err:error}).status(400)
    }
}


export const GetAllCategory=async(req:Request,res:Response)=>{
    try{
        const categories:CategoryType[]=await categoryModal.find()

        if(categories){
            const response=await Promise.all(categories.map(async(item)=>{
                const imagepath=item.image[0].path
                const absolutepath=path.resolve(imagepath)
                const imageBuffer=await fs.readFile(absolutepath)
                const imageBase64 = Array.from(new Uint8Array(imageBuffer));


                return {
                    name:item.name,
                    image:imageBase64
                }
            }))

            res.json(response).status(200)

        }

    

    }
    catch(error:any){
        res.json({error:'Internal server error',err:error.message})
    }
}