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
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
}
