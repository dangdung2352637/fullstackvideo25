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
    errCode:1,
    meesage:'missing inputs parameter!',
    user: userData.user ? userData.user : {}
  });
};

module.exports = {
  handleLogin: handleLogin,
};
