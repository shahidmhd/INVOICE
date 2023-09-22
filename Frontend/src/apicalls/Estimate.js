import instance from "./axiosinstance";

export const AddEstimatedata = async (payload) => {
    try {
        const response = await instance.post('/api/users/Estimate', payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const getallestimate = async () => {
    try {
        const response = await instance.get('/api/users/allestimate');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getnotdeletedEstimate = async () => {
    try {
        const response = await instance.get('/api/users/currentEstimate');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getselectedEstimate = async (invoiceid) => {
    try {
        const response = await instance.get(`/api/users/selectedEstimate/${invoiceid}`);
        return response.data
    } catch (err) {
        return err.message;
    }
}



export const deleteestimate = async (invoiceid) => {
    try {
        const response = await instance.delete(`/api/users/deleteestimate/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const EditEstimate = async (payload) => {
    try {
        const Invoiceid = payload._id
        const payloadWithoutId = { ...payload };
        delete payloadWithoutId._id;
        const response = await instance.patch(`/api/users/editestimate/${Invoiceid}`, payloadWithoutId);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

// export const searchdatas = async (startdate,enddate) => {
//     try {
//         const data={startdate:startdate,enddate:enddate}
//         const response = await instance.post("/api/users/searchinvoice",data);
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// }
// export const fetchcompanyinvoices = async (companyId) => {
//     try {
//         const data={companyId:companyId}
      
//         const response = await instance.post("/api/users/searchcompanyinvoice",data);
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// }
// export const fetchserviceinvoices = async (servicename) => {
//     try {
//         const data={servicename:servicename}
//         const response = await instance.post("/api/users/searchserviceinvoice",data);
//         return response.data
//     } catch (err) {
//         return err.message;
//     }
// }
