import axios from "axios"
import {BACKEND_URL} from '../constant/serverDetails'

axios.interceptors.request.use(
    config=> {
        config.headers.authorization = `${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


export const uploadFile = async (data) => {

    let postData = data;
    const uploadFileOutput = await axios.post(`${BACKEND_URL}/share/uploadSharingFile`, postData)
    .catch(err => {return {status: 'ERROR'}})


     if (uploadFileOutput.status === 200 || uploadFileOutput.data){
         return uploadFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const fetchAllFiles = async () => {

    const allFileOutput = await axios.get(`${BACKEND_URL}/share/getAllSharedFiles`)
    .catch(err => {return {status: 'ERROR'}})


     if (allFileOutput.status === 200 || allFileOutput.data){
         return allFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}