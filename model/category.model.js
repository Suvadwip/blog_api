const mongoose= require("mongoose")
const schema= mongoose.Schema

const categorySchema= new schema({
    name:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

const categoryModel= new mongoose.model("category",categorySchema)
module.exports= categoryModel