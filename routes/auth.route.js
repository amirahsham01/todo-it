const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../config/config");

/* 
    @route POST api/auth/register
    @desc register user
    @access public
*/
router.post("/register", async (req, res) => {
    let { username, email, password } = req.body;

    try {
        let user = new User({ username, email });

        // hash password before save
        let hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;

        // save user
        const savedUser = await user.save();

        const payload = {
            user: {
                id: savedUser._id,
            },
        };

        jwt.sign(payload, "seifewdaystogo", 
        { expiresIn: 3600000000 }, 
        (err, token) => {
            if (err) throw err;
            // 201 - success and new data was added
            res.status(201).json({ message: "user registered successfully", token });
        }
        );

    } catch (err) {
        // 500 - internal server error
        console.log(err);
        res.status(500).json({ message: "oh no!! user not registered "});
    }

});

/* 
    @route POST api/auth/login
    @desc login user
    @access public
*/
router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(payload, "seifewdaystogo", 
        { expiresIn: 3600000000 }, 
        (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "hmm dunno what happened man" });
    }
});

/* 
    @route GET api/auth/user
    @desc gets user info
    @access public
*/

router.get("/user", checkToken, async (req, res) => {
    try {
      let user = await User.findById(req.user.id, "-password")
        .populate("todos");
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "something is wrong!",
      });
    }
});

module.exports = router;