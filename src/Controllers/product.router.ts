import  {Request,Response} from "express"
import Product from "../Modal/product.modal"
import categoryModal from "../Modal/category.modal"

export const createProduct=async(req:Request,res:Response)=>{        
    try{
        const category=await categoryModal.findById(req.body.category)
        const images=req.files as Express.Multer.File[]

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

            if (images) {
                images.forEach((element:any) => {
                    const file = {
                        fieldname: 'images',
                        filename: element.filename,
                        originalname: element.originalname,
                        mimetype: element.mimetype,
                        path: element.path,
                    };
                    (product.images as any[]).push(file);
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