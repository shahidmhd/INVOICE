import instance from "./axiosinstance";

export const AddBankdata = async (payload) => {
    try {
        const response = await instance.post('/api/users/bank', payload);
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const getallbank = async () => {
    try {
        const response = await instance.get('/api/users/bank');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}


export const editbank = async (payload) => {
    try {
        const response = await instance.patch(`/api/users/bank/${payload._id}`, payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deletebank = async (id) => {
    try {
        const response = await instance.delete(`/api/users/bank/${id}`);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}