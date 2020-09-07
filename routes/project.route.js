const router = require("express").Router();
const checkToken = require("../config/config");
const Project = require("../models/project.model");
const Todo = require("../models/todo.model");
const User = require("../models/user.model");

/* 
    @route GET projects/:id
    @desc GETs one project
    @access public
*/
router.get("/:id", async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        res.status(200).json({
            message: "project found",
            project,
        });
    } catch (err) {
        res.status(500).json({
            message: "oh no! couldn't retrieve project",
            statuscode: "EB500",
        });
    }
});

/*
    @route PUT projects/:id
    @desc updates one project
    @access public
*/
router.put("/:id", async (req, res) => {
    try {
        let project = await Project.findByIdAndUpdate(req.params.id, req.body);

        if (project) {
            res.status(200).json({
                message: "ok done change",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "dont work leh",
        });
    }
});

/*
    @route GET projects/:id
    @desc deletes one project
    @access public
*/
router.delete("/:id", async (req, res) => {
    try {
        let projectDelete = await Project.findByIdAndDelete(req.params.id);
        if(projectDelete){
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
    @route POST api/projects
    @desc posts a project
    @access public
*/
router.post("/", checkToken, async (req, res) => {
    try {
        let project = new Project(req.body);
        project.author = req.user.id;

        let savedProject = await project.save();
        let user = await User.findById(project.author);

        if (savedProject) {
            user.projects.push(project._id);
            user.save();
        }

        res.status(201).json({
            message: "Project added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            statuscode: "EB500",
        });
    }
});

/* 
    @route GET api/projects
    @desc gets all projects
    @access public
*/
router.get("/", checkToken, async (req, res) => {
    try {
        //get all projects
        let projects = await Project.find()
            .populate("author")
            .populate("todos")

        //get all labels
        let todos = await Todo.find();

        res.status(200).json({
            count: projects.length,
            projects,
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            statuscode: "EB500",
        });
    }
});

module.exports = router;