import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from the service",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from cc the service",
    });
  }
};
let getDetailSpecialtyById = async (req, res) =>{
  try {
    let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      errMassage: "Error from lz mẹ nó  the service",
    });
  }
}

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
