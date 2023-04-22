import db from "../models/index";
import _ from 'lodash';
let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                order: [["createdAt", "descriptionHTML"]],
                attributes: {
                    exclude: ["password", "image"],
                },
                // raw: true
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleID: "R2" },
                attributes: {
                    exclude: ["password", "image"],
                },
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.action||
                !inputData.selectedPrice || !inputData.selectedPayment ||
                !inputData.selectedProvince ||
                !inputData.nameClinic ||
                !inputData.addressClinic ||
                !inputData.note

            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!",
                });
            } else {
                if (inputData.action === 'ADD') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        descriptionHTML: inputData.descriptionHTML,
                        doctorId: inputData.doctorId
                    });
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.descriptionHTML = inputData.descriptionHTML;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save()
                    }
                }
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },
                    raw: false
                })
                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;
                    await doctorInfor.save()
                }
                else {
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor succeed!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorService = (inpuId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inpuId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inpuId,
                    },
                    attributes: {
                        exclude: ["password",]
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["descriptionHTML", "contentHTML", "contentMarkdown"],
                        },
                        { model: db.Allcode, as: "positionData", attributes: ["valueVi"] },
                        { model: db.Doctor_Infor,
                            attributes:{
                                exclude: ['id','doctorId'   ]
                            },
                            include: [
                                {model: db.Allcode, as: "priceTypeData", attributes: ["valueVi"]},
                                {model: db.Allcode, as: "paymentTypeData", attributes: ["valueVi"]},
                                {model: db.Allcode, as: "provinceTypeData", attributes: ["valueVi"]}
                            ]
                           
                            },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorService: getDetailDoctorService,
};