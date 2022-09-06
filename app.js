const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./configs/database.config");

const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const adminMainRouter = require("./router/admin.mainRouter");


// const userMainRouter = require("./routers/user.mainRouter");
// const authMainRouter = require("./routers/auth.mainRouter");
// const logger = require("morgan");
const port = process.env.PORT || 4007;
const url = process.env.URL || "http://localhost:";
const secret = process.env.SECRET;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.locals.baseurl = url + port + "/";
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(logger("combined"));
app.use(adminMainRouter);
// app.use(userMainRouter);
// app.use(authMainRouter);
app.set('view engine', 'ejs');
app.set('views', 'views')
app.listen(port, () => {
    console.log(`Server is running on ${app.locals.baseurl}`);
});

