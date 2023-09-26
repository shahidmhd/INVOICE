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

