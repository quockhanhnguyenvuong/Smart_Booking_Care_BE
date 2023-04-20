import doctorService from "../services/doctorService";

let getTopDoctorHome = async(req, res) => {
    let limit= req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(response);

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Erro from server...'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome
}