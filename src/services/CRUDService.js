import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra độ dài mật khẩu
      if (data.password.length < 8 || data.password.length > 15) {
        throw new Error("Password must be between 8 and 15 characters long!");
      }
      
      // Kiểm tra email đã tồn tại trong database hay chưa
      let user = await db.User.findOne({
        where: {
          email: data.email
        }
      });
      if (user) {
        throw new Error("Email is already taken!");
      }
      
      // Kiểm tra xem mật khẩu có chứa khoảng trắng hay không
      if (/\s/.test(data.password)) {
        throw new Error("Password should not contain whitespace!");
      }
      
      // Kiểm tra xem mật khẩu có chứa ký tự viết hoa hay không
      if (!/[A-Z]/.test(data.password)) {
        throw new Error("Password should contain at least one uppercase letter!");
      }
      
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleID: data.roleID,
      });
      resolve("created a new user success!");
    } catch (e) {
      reject(e);
    }
  });
};
// let createNewUser = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPasswordFromBcrypt = await hashUserPassword(data.password);
//       await db.User.create({
//         email: data.email,
//         password: hashPasswordFromBcrypt,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         address: data.address,
//         phonenumber: data.phonenumber,
//         gender: data.gender === "1" ? true : false,
//         roleID: data.roleID,
//       });
//       resolve("created a new user success!");
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

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
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;

        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCRUDById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        user.destroy();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteCRUDById: deleteCRUDById,
};
