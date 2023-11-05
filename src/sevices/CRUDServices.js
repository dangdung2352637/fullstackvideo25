import bcrypt from "bcryptjs";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("ok create a new use secceed");
    } catch (e) {
      reject(e);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll();
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if(!data.id){
      //   resolve({
      //     errCode:2,
      //     message: 'missing required parameter'
      //   })}
      let user = await db.User.findOne({
        where: { id: data.id }, raw:false
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  console.log("hello",userId);
return new Promise(async(resolve, reject) => {
  try{
let user = await db.User.findOne({
  where: {id: userId}
})
if(user){
   await user.destroy()
}
resolve();
  }catch(e){
    reject(e)
  }
})

}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};



// let a = Promise((resolve , reject) => {

// })