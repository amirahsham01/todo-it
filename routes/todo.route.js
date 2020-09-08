const router = require("express").Router();
const Todo = require("../models/todo.model");
const checkToken = require("../config/config");
const User = require("../models/user.model");

/* 
    @route GET api/todos/:id
    @desc GETs one todo
    @access public
*/
router.get("/:id", async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        res.status(200).json({
            message: "todo found",
            todo,
        });
    } catch (err) {
        res.status(500).json({
            message: "oh no! wheres that todo now",
            statuscode: "EB500",
        });
    }
});

/* 
    @route PUT api/todos/:id
    @desc updates one todo
    @access public
*/
router.put("/:id", async (req, res) => {
    try {
        let todo = await Todo.findByIdAndUpdate(req.params.id, req.body);

        if (todo) {
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
    @route DELETE api/todos/:id
    @desc deletes one todo
    @access public
*/
router.delete("/:id", async (req, res) => {
    try {
        let todoDelete = await Todo.findByIdAndDelete(req.params.id);

        if (todoDelete) {
            res.status(200).json({
                message: "deleted",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            statuscode: "EB500",
        });
    }
});

/* 
    @route POST api/todos
    @desc gets all todos
    @access public
*/
router.post("/", checkToken, async (req, res) => {
    try {
        let todo = new Todo(req.body);
        todo.author = req.user.id;

        let savedTodo = await todo.save();
        let user = await User.findById(todo.author);

        if (savedTodo) {
            user.todos.push(todo._id);
            user.save();
        }

        res.status(201).json({
            message: "Todo added",
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
    @route GET api/todos
    @desc gets all todos
    @access public
*/
router.get("/", checkToken, async (req, res) => {
    try {
        // find user
        let user = await User.findById(req.user.id)
        .populate("todos");

        //get all users' todos
        let todos = user.todos;

        res.status(200).json({
            count: todos.length,
            todos,
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            statuscode: "EB500",
        });
    }
});

module.exports = router;