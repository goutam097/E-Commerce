const AdminModel = require("../../models/admin.model");


exports.dashboardView = async (req, res) => {
    // res.render("home", {
    //     path: "/view"
    // });
    try {
        console.log(req.user)
        const adminList = await AdminModel.findAll()
        if (adminList) {
            return res.render('home', {
                data: adminList,
                title: "Product List"
            })
        }
    } catch (error) {
        console.log(error);
    }
}