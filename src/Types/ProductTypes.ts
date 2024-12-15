interface ProductSchemaType{
    name:String,
    price:Number,
    description:String,
    category:String,
    quantity:Number
    images:[Object]
}


export interface CustomImageFile {
    fieldname: string;
    filename: string;
    originalname: string;
    mimetype: string;
    path: string;
    size: number;
}