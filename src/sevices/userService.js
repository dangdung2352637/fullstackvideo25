import db from "../models/index";
import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

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
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        console.log("1", 1);
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist??
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "your email is aready in used , plz another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          image: data.image,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      resolve({
        errCode: 2,
        errMeesage: `the user isn't exist `,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMeesage: `the user is deleted`,
    });
  });
};

let updateUserData = (data) => {
  console.log("data", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        console.log("check data node", data);
        resolve({
          errCode: 2,
          message: "missing required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      console.log("user", user);
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address);

        await user.save();

        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName:data.lastName,
        //   address: data.address
        // })

        resolve({
          errCode: 0,
          message: "update the use succeed",
        });
      } else {
      }
      resolve({
        errCode: 1,
        errMeesage: `User's not found`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(typeInput);
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMeesage: "missing required parameter !",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        // console.log("useservser allcode",allCode)
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  CreateNewUser: CreateNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
