import doctorService from "../services/doctorService";

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server!",
    });
  }
};

let postInforDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server!",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorService(req.query.id);

    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from ther server!",
    });
  }
};

module.exports = {
  getAllDoctors: getAllDoctors,
  postInforDoctors: postInforDoctors,
  getDetailDoctorById: getDetailDoctorById,
};
