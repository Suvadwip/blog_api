const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

const fs = require("fs");
class userController {
  async userGet(req, res) {
    // console.log(req.body);
    // console.log("hello");
    try {
      const user = await userModel.findById(req.params.id);
      return res.status(200).json({
        message: "Data get successfully",
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async userDelete(req, res) {
    try {
      let deleteData = await userModel.findByIdAndRemove(req.params.id);
      if (deleteData) {
        return res.status(200).json({
          message: "Data deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Data not deleted",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async userUpdate(req, res) {
    console.log("After bcrypt",req.body);
    // console.log(req.file);
    try {
      req.body.username = req.body.username;
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      req.body.image = req.body.image;
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        let isUserExist = await userModel.findOne({ _id: req.params.id });
        // console.log(isUserExist);
        if (isUserExist) {
          let isEmailExist = await userModel.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id },
          });

          if (!isEmailExist) {
            if (req.file) {
              req.body.image = req.file.filename;
            }

            req.body.password = bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10)
            );

            let updateData = await userModel.findByIdAndUpdate(
              req.params.id,
              req.body
            );

            console.log("Before bcrypt",req.body);

            if (req.file) {
              fs.unlinkSync(`./public/uploads/${isUserExist.image}`);
            }
            if (updateData && updateData._id) {
              return res.status(200).json({
                message: "Data updated successfully",
                data:updateData
              });
            } else {
              return res.status(404).json({
                message: "Data not updated successfully",
                data: [],
              });
            }
          } else {
            return res.status(404).json({
              message: "Email already exists",
            });
          }
        } else {
          return res.status(404).json({
            message: "Data not found",
            data: [],
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new userController();
