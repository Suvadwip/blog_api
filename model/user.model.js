const mongoose= require("mongoose")
const schema= mongoose.Schema

const userSchema= new schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
},
{
    timestamps: true,
    versionKey: false
})

const userModel= new mongoose.model("user",userSchema)
module.exports= userModel