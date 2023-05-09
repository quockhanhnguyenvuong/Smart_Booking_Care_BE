import clinicService from '../services/clinicService'
import { getAllSpecialty } from '../services/specialtyService';
let createClinic = async(req, res) => {
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
}
let getAllClinic =async (req, res) =>{
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
}
let getDetailClinicById =async (req, res) =>{
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
  
}
module.exports = {
    createClinic:createClinic,
    getAllClinic:getAllClinic,
    getDetailClinicById: getDetailClinicById,

}