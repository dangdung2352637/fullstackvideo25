import db from "../models/index";
import CRUDServices from "../sevices/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("test/crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  return res.send("post crud server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser({
    raw: true,
  });

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDServices.getUserInfoById(userId);
    console.log(userData);
    //check use data not fond
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("not find useId");
  }
};

let putCRUD = async(req, res) => {
  let data = req.body;
  let allUsers =  await CRUDServices.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
  
}

let deleteCRUD = async (req, res) => {
let id = req.query.id
if(id){
  await CRUDServices.deleteUserById(id);
  return res.send('delete succeed')
}else{
  return res.send('user not found')
}
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
