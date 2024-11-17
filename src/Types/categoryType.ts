interface imageType{
    fieldname:string,
    filename:string,
    originalname:string,
    mimetype:string,
    path:string,
}

export interface CategoryType{
    name:string
    image:[imageType]
}