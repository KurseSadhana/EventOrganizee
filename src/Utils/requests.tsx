
import axios from 'axios';
const basicUrl = "https://www.eventbriteapi.com/v3"
export async function login(token:String){
    return axios.get(`${basicUrl}/users/me/?token=${token}`)
}