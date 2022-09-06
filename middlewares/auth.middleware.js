const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.session.token;
        console.log(token)
        if (!token) {
            console.log("No token provided!")
            res.redirect("/admin/log")
        } else {
            const userDetails = jwt.verify(token, secret);

            if (userDetails) {
                req.user = userDetails;
                next();
            } else {
                console.log("Invalid Token");
                res.redirect("/admin/log")
            }

        }
    } catch (error) {
        res.redirect("/admin/log")
    }
}