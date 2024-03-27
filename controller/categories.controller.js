const categoryModel= require("../model/category.model")
class categoryController{
    async categoryCreate(req,res){
        try {
            let saveCategory= await categoryModel.create(req.body)
            if(saveCategory){
                return res.status(200).json({
                    message:"Category added successfully",
                    data: saveCategory
                })
            }else{
                return res.status(404).json({
                    message:"Category not added successfully",
                    data:[]
                })
            }
        } catch (error) {
           throw error 
        }
    }

    async categoryGet(req,res){
        try {
            let categoryData= await categoryModel.find({})
            return res.status(200).json({
                message:"Categorydata fetch successfully",
                data: categoryData
            })
        } catch (error) {
           throw error 
        }
    }
}
module.exports= new categoryController()