const mongoose= require("mongoose")
const schema= mongoose.Schema

const postSchema= new schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      username: {
        type: String,
        required: false,
      },
      categories: {
        type: Array,
        required: false,
      },
},
{
    timestamps: true,
    versionKey: false
})

const postModel= new mongoose.model("post",postSchema)
module.exports= postModel;