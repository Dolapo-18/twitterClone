const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

const User = require("../schemas/UserSchema");

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
    res.status(200).render("login");

})

router.post("/", async (req, res, next) => {

    const payload = req.body;

    if(req.body.username && req.body.password){
        const user = await User.findOne({
            $or: [
                {username: req.body.username},
                {email: req.body.email}
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong";
            res.status(400).render("login", payload);

        })

        if(user != null) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if(passwordMatch) {
                req.session.user = user;
                return res.status(200).redirect("/");

            } 
            payload.errorMessage = "Login Credentials Incorrect :(";
            return res.status(400).render("login", payload);
            
        }
    }
    
        payload.errorMessage = "Kindly ensure all fields are entered.";
        return res.status(400).render("login", payload);

})

module.exports = router;
