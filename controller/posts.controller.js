const postModel = require("../model/post.model");
const fs = require("fs");
class postController {
  async postCreate(req, res) {
    console.log(req.body);
    // console.log(req.file);
    try {
      req.body.title = req.body.title;
      req.body.desc = req.body.desc;
      req.body.image = req.body.image;
      req.body.username = req.body.username;
      req.body.categories = req.body.categories;
      /*  const newPost= {
                title: req.body.title,
                desc: req.body.desc,
                image:req.body.image,
            }
            console.log(newPost) */
      if (!req.body.title || !req.body.desc) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        req.body.image = req.file.filename;
        let savePost = await postModel.create(req.body);

        if (savePost && savePost._id) {
          return res.status(200).json({
            message: "Post added successfully",
            data: savePost,
          });
        } else {
          return res.status(404).json({
            message: "Post not added successfully",
            data: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async allPostGet(req, res) {
    try {
      let allPostData = await postModel.find({});
      return res.status(200).json({
        message: "Postdata fetch successfully",
        data: allPostData,
      });
    } catch (error) {
      throw error;
    }
  }

  async singlePostGet(req, res) {
    try {
      let postData = await postModel.findById(req.params.id);
          console.log(postData);  
      return res.status(200).json({
        message: "Single post successfully fetch",
        data: postData,
      });
    } catch (error) {
      console.log("error =>", error);
      throw error;
    }
  }

  //

  async postDelete(req, res) {
    try {
      let deletePostData = await postModel.findByIdAndRemove(req.params.id);
      if (deletePostData) {
        return res.status(200).json({
          message: "Postdata deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Postdata not deleted",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async postUpdate(req, res) {
    console.log(req.body);
    try {
      req.body.title = req.body.title;
      req.body.desc = req.body.desc;
      //req.body.image = req.body.image;
      // req.body.username = req.body.username;
      //  req.body.categories = req.body.categories;
      if (
        !req.body.title ||
        !req.body.desc  
        // !req.body.username ||
        //  !req.body.categories
      ) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        // if(req.file){
        //   req.body.image= req.file.filename
        // }
        let updateData = await postModel.findByIdAndUpdate(
          req.params.id, req.body
        );

        if (updateData && updateData._id) {
          return res.status(200).json({
            message: "Data updated successfully",
          });
        } else {
          return res.status(404).json({
            message: "Data not updated successfully",
            data: [],
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new postController();
