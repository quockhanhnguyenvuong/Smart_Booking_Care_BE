import db from "../models/index";
require("dotenv").config();
import emailServices from "./emailServices";
import doctorServices from "./doctorService"
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};

let postBookAppointment = async (data) => {
  try {
    // Kiểm tra email có trong blacklist không
    const blacklistCheck = await doctorServices.checkBlacklist(data.doctorId, data.email);
    if (blacklistCheck.errCode === 0 && blacklistCheck.data) {
      // Nếu email có trong blacklist, từ chối đặt lịch hẹn
      return {
        errCode: 1,
        errMessage: "Email is blacklisted for this doctor",
      };
    }

    // Nếu email không có trong blacklist, tiến hành đặt lịch hẹn
    if (
      !data.email ||
      !data.doctorId ||
      !data.address ||
      !data.date ||
      !data.fullName ||
      !data.gender ||
      !data.address
    ) {
      return {
        errCode: 1,
        errMessage: "Missing parameter",
      };
    } else {
      let token = uuidv4();
      await emailServices.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        redirectLink: buildUrlEmail(data.doctorId, token),
      });

      let user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          roleID: "R3",
          phonenumber: data.phonenumber,
          gender: data.gender,
          address: data.address,
          positionID: "P0",
        },
      });

      if (user && user[0]) {
        await db.Booking.create({
          statusId: "S1",
          doctorId: data.doctorId,
          patientId: user[0].id,
          address: data.address,
          date: data.date,
          timeType: data.timeType,
          token: token,
          bookingType: data.bookingType,
          reason: data.reason,
        });
      }

      return {
        data: user,
        errCode: 0,
        errMessage: "Save info patient success",
      };
    }
  } catch (e) {
    return {
      errCode: 2,
      errMessage: "An error occurred",
    };
  }
};


let postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        // console.log(appointment);
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or dose not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointmentService: postVerifyBookAppointmentService,
};
