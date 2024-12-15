import  {Request,Response} from "express"
import Product from "../Modal/product.modal"
import categoryModal from "../Modal/category.modal"
import mongoose from "mongoose"
import { CustomImageFile } from "../Types/ProductTypes"

export const createProduct=async(req:Request,res:Response)=>{        
    try{
        const category=await categoryModal.findById(req.body.category)
        const images:CustomImageFile[]=req.files as CustomImageFile[]

        console.log(req);
        
        if(category){
            const product=new Product({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category,
                images:[],
                user_id:req.headers.username
            })

            if (images&& Array.isArray(images)) {
                images.forEach((element:any) => {
                    if (element && element.filename && element.originalname && element.mimetype && element.path&&Array.isArray(product.images)) {
                        const file:CustomImageFile = {
                            fieldname: 'images',
                            filename: element.filename,
                            originalname: element.originalname,
                            mimetype: element.mimetype,
                            path: element.path,
                            size:element.size
                        };
                        product.images.push(file)
                    } else {
                        console.log('Invalid image element:', element);
                    }
                });
            }
            await product.save()
            res.status(201).json({message:"Product created successfully"})
        }
        else{
            throw new Error("Category not found")
        }
        
    }catch(error:any){
        res.status(400).json({error:"Something went wrong",err:error.message})
    }
}

export const GetAllMyProducts=async(req:Request,res:Response)=>{
    try {
        const data=await Product.find({"user_id":req.headers.username})
        res.status(200).json(data)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

export const GetNewArivals=async(req:Request,res:Response)=>{
    try{
        const data=await Product.find()
        if(data.length>5){
            let split=data.slice(data.length-5,data.length).reverse()
            res.status(200).json(split)
        }
        else{
            res.status(200).json(data)

        }
        

    }
    catch(error:any){
        res.status(400).json({error:error.message})
    }
}

export const getProductById=async(req:Request,res:Response)=>{
    try {
        console.log("hit",req.query.id);
        // if (!mongoose.Types.ObjectId.isValid('673e11ef318501c8860f6867')) {
        //    throw new Error("Invald category id")
        // }

        const page=Number(req.query.page?req.query.page:1)
        
        const data=await Product.aggregate([
            {$match:{
                "category":{$in:[req.query.id]}
            }},
            {
                $project:{
                    _id:1,
                    name:1,
                    price:1,
                    images:1
                }
            }
        ])
        const total=data.length
        data.slice(page-10 ,page*10)
        const category=await categoryModal.findById(req.query.id)
        if(category){
            const response={"category_name":category.name,"products":data,"total":total}
            res.status(200).json(response)
        }
        else{
            throw new Error("Category not found")
        }
    } catch (error:any) {
        res.status(400).json({error: "Unable to load data",err:error.message})
    }
}


export const GetItemById=async(req:Request,res:Response)=>{
    try{
        const data=await Product.findById(req.body.product_id);
        res.json(data).status(200)
    }
    catch(error){
        res.status(400).json({error:"Internal server error",message:error})
    }
}


export const editStocks=async(req:Request,res:Response)=>{
    try{
        const product_id:string=req.body.product_id
        const quantity:number=req.body.quantity
        const updatedProduct=await Product.findByIdAndUpdate(product_id,{$inc:{quantity:quantity}},{new:true})
        if(!updatedProduct){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product updated successfully",product:updatedProduct})
    }catch(error:any){
        res.status(400).json({error:error.message})
    }
}