import instance from "./axiosinstance";

export const AddExpensedata = async (payload) => {
    try {
        const response = await instance.post('/api/users/expense', payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const getallexpense = async () => {
    try {
        const response = await instance.get('/api/users/expense');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getnotdeletedexpense = async () => {
    try {
        const response = await instance.get('/api/users/currentexpense');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deleteexpense = async (invoiceid) => {
    try {
        const response = await instance.delete(`/api/users/expense/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const getselectedexpense = async (invoiceid) => {
    try {
        const response = await instance.get(`/api/users/expense/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const Editexpensedata = async (payload) => {
    try {
        console.log(payload,"tyttt");
        const Invoiceid = payload._id
        const payloadWithoutId = { ...payload };
        delete payloadWithoutId._id;
        console.log(payloadWithoutId,"iii");
        console.log(Invoiceid,"hhhh");
        const response = await instance.patch(`/api/users/expense/${Invoiceid}`, payloadWithoutId);
        console.log(response,"res");
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
