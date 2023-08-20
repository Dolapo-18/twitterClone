const express = require('express');
const app = express();
const PORT = 5001;

const middleware = require("./middleware")


app.set("view engine", "pug");
//set the folder to render the pug files
app.set("views", "views");

//Routes
const loginRoutes = require("./routes/loginRoutes")
app.use("/login", loginRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    }
    res.status(200).render("home", payload);
})


const server  = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})