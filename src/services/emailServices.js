require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"System Booking A Medical Appointment " <bookingdoctor2023@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailSimple(dataSend),
  });
};

let getBodyHTMLEmailSimple = (dataSend) => {
  let result = "";
  result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên System Booking A Medical Appointment/p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để 
            xác nhận đặt lịch khám bệnh.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
        <div>Xin chân thành cảm ơn, ${dataSend.patientName}!</div>
    `; // html body
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên System Booking A Medical Appointment thành công!</p>
    <p>Hẹn gặp ${dataSend.patientName} vào lúc: ${dataSend.timeType} ${dataSend.date} </p>
    <div>Xin chân thành cảm ơn!</div>
  `; // html body
  return result;
};

//send accept
let sendAttachmentRemedy = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"System Booking A Medical Appointment " <bookingdoctor2023@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        // attachments: [
        //   {
        //     filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        //     content: dataSend.imgBase64.split("base64,")[1],
        //     encoding: "base64",
        //   }
        // ]
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

let getBodyHTMLEmailRefuse = (dataSend) => {
  let result = "";
  result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên System Booking A Medical Appointment thất bại!</p>
    <p>Vì lý do: ${dataSend.reason}</p>
    <p>Hẹn gặp lại bạn lần sau </p>
    <div>Xin chân thành cảm ơn!</div>
  `; // html body
  return result;
};

// send refuse
let sendAttachmentRefuse = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"System Booking A Medical Appointment " <bookingdoctor2023@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRefuse(dataSend),
      });
      // console.log("check infor send email: ");
      // console.log(info);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
let getBodyHTMLEmailBlackList = (dataSend, doctorName) => {
  let result = "";
  result = `
    <h3>Cảnh báo ${dataSend.patientName}!</h3>
    <p>Bạn vừa bị thêm vào BlackList</p>
    <p>Bạn sẽ không thể đặt lịch khám bệnh  của bác sĩ ${doctorName} </p>
    <p>Vì lý do: ${dataSend.reason} </p>
    <p>Tài khoản của bạn sẽ bị khóa nếu bạn nhận ba lần report!!</p>
    <p>Nếu có thắc mắc hay phản hồi, xin liên hệ với quản trị viên</p>
    <div>Xin chân thành cảm ơn!</div>
  `; // html body
  return result;
};
// send refuse
let sendWarnBlackList = async (dataSend, doctorName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"System Booking A Medical Appointment " <bookingdoctor3@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Cảnh báo tài khoản", // Subject line
        html: getBodyHTMLEmailBlackList(dataSend, doctorName),
      });
      // console.log("check infor send email: ");
      // console.log(info);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
let getBodyHTMLEmailIsBlocked = (dataSend, doctorName) => {
  let result = "";
  result = `
    <h3>Thông báo khóa tài khoản !</h3>
    <p>Email của bạn đã bị khóa bởi Booking Doctor vì đã vi phạm điều khoản</p>
    <b>Bạn sẽ không thể đăng nhập Booking Doctor nữa</b>
    <p>Nếu có thắc mắc hay phản hồi, xin liên hệ với quản trị viên</p>
  `; // html body
  return result;
};
// send refuse
let sendWarnEmailIsBlocked = async (dataSend, doctorName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"System Booking A Medical Appointment " <bookingdoctor3@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Khóa tài khoản", // Subject line
        html: getBodyHTMLEmailIsBlocked(dataSend, doctorName),
      });
      // console.log("check infor send email: ");
      // console.log(info);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachmentRemedy: sendAttachmentRemedy,
  sendAttachmentRefuse: sendAttachmentRefuse,
  sendWarnBlackList: sendWarnBlackList,
  sendWarnEmailIsBlocked: sendWarnEmailIsBlocked,
};
