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
    const uploadFileOutput = await axios.post(`${BACKEND_URL}/drive/uploadSingleFile`, postData)
    .catch(err => {return {status: 'ERROR'}})


     if (uploadFileOutput.status === 200 || uploadFileOutput.data){
         return uploadFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const fetchAllFiles = async () => {

    const allFileOutput = await axios.get(`${BACKEND_URL}/drive/getAllFiles`)
    .catch(err => {return {status: 'ERROR'}})


     if (allFileOutput.status === 200 || allFileOutput.data){
         return allFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const createFolder = async () => {

    const folder = await axios.get(`${BACKEND_URL}/drive/createFolder`)
    .catch(err => {return {status: 'ERROR'}})


     if (folder.status === 200 || folder.data){
         return folder.data;
     } else{
         return {status: 'ERROR'}
     }
}



export const getDriveStats = async () => {

    const driveSize = await axios.get(`${BACKEND_URL}/drive/gettotalStats`)
    .catch(err => {return {status: 'ERROR'}})
     if (driveSize.status === 200 || driveSize.data){
         return driveSize.data;
     } else{
         return {status: 'ERROR'}
     }
}


export const deleteFile = async (itemId) => {
    let postData = {itemId:itemId};
    console.log(postData)
    const deleteFileOutput = await axios.post(`${BACKEND_URL}/drive/deleteFile`, postData)
    .catch(err => {return {status: 'ERROR'}})
    // console.log(deleteFileOutput)
     if (deleteFileOutput.status === 200 || deleteFileOutput.data){
         return deleteFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}
