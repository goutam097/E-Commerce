

const AdminModel = require("../../models/admin.model");

exports.list = async (req, res) => {
    const userId = req.session.userId || ""
    const userDetails = await AdminModel.findOne({ where: { id: userId } });
    res.render("personDetails", {
        data: userDetails,
    });
};

exports.update = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { name, email, mobile, gender } = req.body;
        const dataUpdate = await AdminModel.update({ name, email, mobile, gender }, { where: { id: userId } })
        return res.redirect("back")




    } catch (error) {
        console.log("Something went woring", error);
        return res.redirect('back');
    }
}