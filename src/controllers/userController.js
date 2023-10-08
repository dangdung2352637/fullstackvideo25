import userService from "../sevices/userService";

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
  let id = req.body.id;
  let users = await userService.getAllUsers(id);
  console.log(users);

  return res.status(200).json({
    errCode: 0,
    errMeesage: "ok",
    users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
};
