import userService from "../sevices/userService";
import CRUDServices from "../sevices/CRUDServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("email", !email);

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input ",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log("userdata", userData);

  return res.status(200).json({
    // check email exist
    //compare password
    //return userInfor
    //accee_token:JWWT json web token
    errCode: userData.errCode,
    meesage: userData.errMeesage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUsers(id);
  console.log(users);

  return res.status(200).json({
    errCode: 0,
    errMeesage: "ok",
    users,
  });
};

let handleCreateNewUser = async(req, res) => {
  let meesage = await userService.CreateNewUser(req.body)
  return res.status(200).json(meesage)
}

let handleDeleteUser = async(req, res) => {
if(!req.body.id){
  return res.status(200).json({
    errCode: 1,
    errMeesage: "missing required parameter"
  })
}
  let meesage = await userService.deleteUser(req.body.id)
  return res.status(200).json(meesage)
}

let handleEditUser = async(req, res) => {
  let data = req.body;
  let meesage =  await userService.updateUserData(data);
  return res.status(200).json(meesage)

}


module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  
};
