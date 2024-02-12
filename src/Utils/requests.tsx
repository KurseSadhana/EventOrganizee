
import axios from 'axios';
const baseUrl = "https://www.eventbriteapi.com"
const authUrl = "https://www.eventbrite.com/oauth/authorize"
const organizationId = "1986941163813"

class PrivateKey {
    private token:String;
    public getToken(){
        return this.token
    }
    public setToken(t:String){
       this.token = t 
    }
}

const privateToken = new PrivateKey();
export async function login(token:String){
    privateToken.setToken(token)
    return axios.get(`${baseUrl}/v3/users/me/?token=${token}`)
}

export async function authenticate(url?:String){
    return axios.get(`${authUrl}/?response_type=code&client_id=${privateToken.getToken()}${url?`&redirect_uri=${url}`:``}`);
}
export async function getEvents(){
    return axios.get(`${baseUrl}/v3/organizations/${organizationId}/events/?token=${privateToken.getToken()}`)
}

export function HandleError(err){
    console.log(err)
}