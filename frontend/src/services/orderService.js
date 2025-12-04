import axios from 'axios';
import { getUser } from './userService'; 

export const createOrder = async order => {
  try {
    const authUser = getUser();
    
    if (!authUser || !authUser.token) {
       console.error("Authentication Error: Token missing in getUser()"); 
        throw new Error("User not authenticated or token missing.");
    }

    console.log("Token being sent:", authUser.token); 

    const config = {
  
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    };

    const { data } = await axios.post('/api/orders/create', order, config); 
    return data;
  } catch (error) {
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {

    const authUser = getUser();
    const config = {
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
      },
    };

    const { data } = await axios.get('/api/orders/newOrderForCurrentUser', config);
    return data;
};


// export const pay = async paymentId => {
//   try {
//     const { data } = await axios.put('/api/orders/pay', { paymentId });
//     return data;
//   } catch (error) {}
// };

// export const trackOrderById = async orderId => {
//   const { data } = await axios.get('/api/orders/track/' + orderId);
//   return data;
// };

// export const getAll = async state => {
//   const { data } = await axios.get(`/api/orders/${state ?? ''}`);
//   return data;
// };

// export const getAllStatus = async () => {
//   const { data } = await axios.get(`/api/orders/allstatus`);
//   return data;
// };