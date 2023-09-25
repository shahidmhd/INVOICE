import instance from "./axiosinstance";

export const AddLedgerdata = async (payload) => {
    try {
        console.log(payload);
        const response = await instance.post('/api/users/ledger', payload);
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const getallLedger = async () => {
    try {
        const response = await instance.get('/api/users/ledger');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getnotdeletedallledger = async () => {
    try {
        const response = await instance.get('/api/users/currentledger');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const editledger = async (payload) => {
    try {
        const response = await instance.patch(`/api/users/ledger/${payload._id}`, payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deleteledger = async (id) => {
    try {
        const response = await instance.delete(`/api/users/ledger/${id}`);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}