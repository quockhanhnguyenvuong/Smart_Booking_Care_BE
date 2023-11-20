import clinicService from "../services/clinicService";
let createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from the service",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from the service",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from the service",
    });
  }
};

let handleDeleteClinic = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requied parameters!",
    });
  }
  let message = await clinicService.deleteClinic(req.body.id);
  return res.status(200).json(message);
};

let handleEditClinic = async (req, res) => {
  let data = req.body;
  let message = await clinicService.editClinicService(data);
  return res.status(200).json(message);
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  handleDeleteClinic: handleDeleteClinic,
  handleEditClinic: handleEditClinic,
};
