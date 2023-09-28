import instance from "./axiosinstance";

export const Addterms = async (payload) => {
    try {
        const response = await instance.post('/api/users/terms', payload);
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const getallterms = async () => {
    try {
        const response = await instance.get('/api/users/terms');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}


export const editterms = async (payload) => {
    try {
        const response = await instance.patch(`/api/users/terms/${payload._id}`, payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deleteterms = async (id) => {
    try {
        const response = await instance.delete(`/api/users/terms/${id}`);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}