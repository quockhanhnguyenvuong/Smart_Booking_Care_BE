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
    from: '"System Booking A Medical Appointment " <smartbookingcare@gmail.com>', // sender address
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
        from: '"System Booking A Medical Appointment " <smartbookingcare@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
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
    <p>Hẹn gặp ${dataSend.patientName} vào lúc: ${dataSend.date} </p>

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
        from: '"System Booking A Medical Appointment " <smartbookingcare@gmail.com>', // sender address
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
 
// //Gửi email lấy code để đổi mk
// let sendEmailGetPassword = async (dataSend) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // create reusable transporter object using the default SMTP transport
//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: process.env.EMAIL_APP, // generated ethereal user
//           pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
//         },
//       });
      
//       // send mail with defined transport object
//       let info = await transporter.sendMail({
//         from: '"System Booking A Medical Appointment " <bookingdoctor3@gmail.com>', // sender address
//         to: dataSend.email, // list of receivers
//         subject: "Mã OTP cấp lại mật khẩu (System Booking A Medical Appointment)", // Subject line
//         html: getBodyHTMLEmailCode(dataSend),
//       });
//       console.log("Sending email end....");
//       console.log("email: ", dataSend.email)
//       console.log("OTP (email): ", OTP);
//       resolve(true);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

//   // //mã OTP ramdom
//   //   const OTP = Math.floor(100000 + Math.random() * 900000);

// //body mail gửi code reset password
// let getBodyHTMLEmailCode = (dataSend) => {
//   let result = "";
//   result = `
//     <h3>Xin chào! </h3>
//     <p>Bạn đang thực hiện xin cấp lại mật khẩu đăng nhập cổng giao dịch điện tử System Booking A Medical Appointment </p>
//     <p>Đây là mã phê duyệt cho tài khoản của bạn: OTP - <b style="color:green">${OTP}</b> </p>
//     <p> <small> (<b style="color:red">*</b>) Lưu ý: Mã OTP chỉ có giá trị trong vòng 5 phút.</small> </p>
//     <div>Nếu bạn không phải là người gửi yêu cầu này, hãy đổi mật khẩu tài khoản ngay lập tức để tránh việc bị truy cập trái phép.</div>

//     <div>Xin chân thành cảm ơn!</div>
//   `; // html body
//   return result;
// };

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachmentRemedy: sendAttachmentRemedy,
  sendAttachmentRefuse: sendAttachmentRefuse,
  // sendEmailGetPassword: sendEmailGetPassword
};
