import bcrypt from "bcryptjs";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
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
  // console.log("data from services");
  // console.log(hashPasswordFromBcrypt);
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
      let users = db.User.findAll();
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
};
