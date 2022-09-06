const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const AdminModel = require("../../models/admin.model");
// const cartModel = require("../../models/cart.model");





exports.log = async (req, res) => {
    res.render("login", {
        path: "/log"
    });
}

exports.login = async (req, res) => {
    const email = req.body.email || "";
    const password = req.body.password || "";

    const count = await AdminModel.count({
        where: { email: email, status: "active" }
    });
    if (count) {
        const admins = await AdminModel.findOne({
            where: { email: email },
        });
        if (bcrypt.compareSync(password, admins.password)) {
            const details = {
                id: admins.id,
                name: admins.name,
                email: admins.email
            };
            const token = jwt.sign(details, secret);
            req.session.userId = admins.id
            req.session.name = admins.name
            req.session.email = admins.email
            req.session.token = token

            // const cartCount = await cartModel.count({
            //     where: {userId:userId}
            // });

            console.log(req.session)

            console.log(details, "User Found");
            res.redirect("/product/view");
        } else {
            res.redirect("back");
            console.log("Password is incorrect");
        }
    } else {
        console.log("User Not Exits!!! please register");
        res.redirect("/admin/reg")
    }
}

exports.reg = async (req, res) => {
    res.render("register", {
        path: "/reg"
    });
}

exports.register = async (req, res) => {
    try {
        const name = req.body.name || "";
        const email = req.body.email || "";
        const mobile = req.body.mobile || "";
        const gender = req.body.gender || "";
        const password = req.body.password || "";
        // const description = req.body.description || "";

        const count = await AdminModel.count({ where: { email: email } });
        if (count > 0) {
            console.log("Email already exist");
            res.redirect("/admin/log")
        } else {
            const hashPassword = bcrypt.hashSync(password, 10);

            await AdminModel.create({
                name: name,
                email: email,
                mobile: mobile,
                gender: gender,
                password: hashPassword,
            })

            console.log(regData, "Successfully Registered");
            res.redirect('/admin/log');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/admin/log');
    }
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/admin/log');

}
