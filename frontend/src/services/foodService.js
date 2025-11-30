import axios from 'axios';

export const getAll = async () => {
    const {data} = await axios.get('/api/foods');
    return data;
};
export const getById = async foodId => {
    const {data} = await axios.get(`/api/foods/${foodId}`); 
    return data;        
}