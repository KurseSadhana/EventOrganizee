
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

export async function addEvents(data){
    return axios.post(`${baseUrl}/v3/organizations/${organizationId}/events/?token=${privateToken.getToken()}`,data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        HandleError(error.response.data.error_description);
      });
}

export async function updateEvent(data){
    let {id} = data
    delete data.id
    return axios.post(`${baseUrl}/v3/events/${id}/`,data,{headers: { Authorization: `Bearer ${privateToken.getToken()}` }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        HandleError(error.response.data.error_description);
      });
}

export async function deleteEvent(data){
    return axios.delete(`${baseUrl}/v3/events/${data.id}/`,{headers: { Authorization: `Bearer ${privateToken.getToken()}` }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        HandleError(error.response.data.error_description);
      });
}

export function HandleError(err){
    alert(err)
}