const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
class authController {
  async register(req, res) {
    // console.log(req.body);
    console.log(req.file);
   /*  try {
      req.body.username = req.body.username;
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      req.body.image = req.body.image;
      if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        req.body.image = req.file.filename;
        let isEmailExist = await userModel.find({ email: req.body.email });
        if (!isEmailExist.length) {
          req.body.password = bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync(10)
          );
          console.log(req.body);
          let saveData = await userModel.create(req.body);
          console.log(saveData);
          if (saveData && saveData._id) {
            return res.status(200).json({
              message: "Data added successfully",
              data: saveData,
            });
          } else {
            return res.status(404).json({
              message: "Data not added successfully",
              data: [],
            });
          }
        } else {
          return res.status(404).json({
            message: "User already exists",
            data: [],
          });
        }
      }
    } catch (error) {
        console.log(error);
      throw error;
    } */
    try {
        // Check if the email already exists
        let existingUser = await userModel.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
                data: existingUser
            });
        }
    
        // Check if the username already exists
        existingUser = await userModel.findOne({ username: req.body.username });
    
        if (existingUser) {
            return res.status(409).json({
                message: "Username already taken",
                data: existingUser
            });
        }
    
        // If neither email nor username exists, proceed with user creation
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        req.body.image = req.file.filename;
        console.log(req.body);
        let saveData = await userModel.create(req.body);
    
        return res.status(200).json({
            message: "Data added successfully",
            data: saveData
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
      
}

  async login(req, res) {
    console.log(req.body);
    try {
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      let isUserExist = await userModel.findOne({ email: req.body.email });
      if (isUserExist) {
        const hashPassword = isUserExist.password;
        const decryptPassword = bcrypt.compareSync(
          req.body.password,
          hashPassword
        );
        if (decryptPassword) {
          return res.status(200).json({
            message: "Login successfully",
            data: isUserExist,
          });
        } else {
          return res.status(404).json({
            message: "Login failed",
          });
        }
      } else {
        return res.status(404).json({
          message: "Check your email",
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new authController();
