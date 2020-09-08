const router = require("express").Router();
const Comment = require("../models/comment.model");
const Todo = require("../models/todo.model");
const checkToken = require("../config/config");

/* 
    @route GET comments/:id
    @desc GETs one comment
    @access public
*/
router.get("/:id", async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id)
        .populate("author");

        res.status(200).json({
            message: "comment found",
            comment,
        });
    } catch (err) {
        res.status(500).json({
            message: "oh no! couldn't retrieve comment",
            statuscode: "EB500",
        });
    }
});

/* 
    @route GET comments/:id
    @desc deletes one comment
    @access public
*/
router.delete("/:id", async (req, res) => {
    try {
        let commentDelete = await Comment.findByIdAndDelete(req.params.id);
        if(commentDelete){
            res.status(200).json({
                message: "deleted",
            });
        }
    } catch (error) {
        res.status(500).json({
          message: "Something went wrong",
          statuscode: "EB500",
        });
      }
});

/* 
    @route POST comment
    @desc Gets all comments
    @access public
*/
router.post("/", checkToken, async (req, res) => {
    try {
      let comment = new Comment(req.body);
      comment.author = req.user.id;

      let savedComment = await comment.save();
      // let todo = await Todo.findById(req.params.id);

      // if (savedComment) {
      //   console.log(req.params);
      //   todo.comments.push(comment._id);
      //   todo.save();
      // }
  
      res.status(201).json({
        message: "comment posted",
      });
    } catch (error) {
      res.status(500).json({
        message: "comment was not posted, try again!",
        statuscode: "EB500",
      });
    }
});

/* 
  @method GET all comments
  @route get all comments
  @access public
*/
router.get("/", async (req, res) => {  
    try {
      let comments = await Comment.find()
        .populate("author");
  
      res.status(200).json({
        message: "found all comments",
      });
    } catch (error) {
      res.status(500).json({
        message: "cant find dem comments",
        statuscode: "EB500",
      });
    }
});

module.exports = router;