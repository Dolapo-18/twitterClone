const express = require('express');
const app = express();
const PORT = 5001;

const bodyParser = require("body-parser");
const session = require('express-session')

const middleware = require("./middleware")
const path = require("path")
const db = require('./database');


app.set("view engine", "pug");
//set the folder to render the pug files
app.set("views", "views");

//serve our static files
app.use(express.static(path.join(__dirname, "public")));

//parse body params
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: "session secret",
    resave: true,
    saveUninitialized: false
}))


//Routes
const loginRoutes = require("./routes/loginRoutes")
const registerRoutes = require("./routes/registerRoutes")
const logoutRoute = require("./routes/logoutRoute")

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})




const server  = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})