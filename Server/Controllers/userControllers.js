import User from "../schemas/User.js";

const getSingleUser = (req, res) => {
    res.send("getSingleUser");
};

const editUser = (req, res) => {
    res.send("editUser");
};

const deleteUser = (req, res) => {
    res.send("deleteUser");
};


export default {
    getSingleUser,
    editUser,
    deleteUser
}