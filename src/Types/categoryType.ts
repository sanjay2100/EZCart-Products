interface imageType{
    fieldname:string,
    filename:string,
    originalname:string,
    mimetype:string,
    path:string,
}

export interface CategoryType{
    _id:String
    name:string
    image:[imageType]
}