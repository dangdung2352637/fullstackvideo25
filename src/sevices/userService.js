import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          console.log("user ---", user);
          console.log("password", password);
          console.log("user-password", user.password);
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          console.log("check--", check);
          // let check = true
          if (check) {
            userData.errCode = 0;
            userData.errMeesage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMeesage = `wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMeesage = `your isn't not found `;
        }
        //user already exis
        // resolve();
      } else {
        userData.errCode = 1;
        userData.errMeesage = `your email isn'n exist in your email `;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      console.log("user:", user);
      console.log("useremail", userEmail);
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password']
          },
        });
      }
      if (userId && userId !== "ALL") {
        console.log("1", 1);
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ['password']
          },
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
};
