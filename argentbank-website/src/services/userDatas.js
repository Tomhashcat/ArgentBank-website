import axios from 'axios';

/**
 * Function to get user datas profile
 * @param {string} token - User authentication token
 * @returns {Promise<any>} Promise with user datas
 */
export async function userDatas(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data && res.data.body) {
         console.log('User data received:', res); 
        resolve(res.data.body);
      } else {
        reject(new Error('Invalid response format'));
      }
    } catch (error) {
      reject(error);
    }
  });
}
