import axios from 'axios';

export const getUser = () =>
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
    
export const login = async (email, password) => {
    try {
 
        const { data } = await axios.post('/api/users/login', {email, password});
        

        localStorage.setItem('user', JSON.stringify(data)); 
        return data;
    } catch (error) {

        throw error; 
    }
};

export const register = async registerData => {
  try {
    const { data } = await axios.post('/api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    // ✅ FIX: Throw the error so the calling component can catch it
    throw error;
  }
};

export const logout = () => {
    localStorage.removeItem('user');
} 