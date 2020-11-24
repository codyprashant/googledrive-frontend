import axios from "axios"
import { config } from "react-transition-group"

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
    const uploadFileOutput = await axios.post("http://localhost:7227/drive/uploadSingleFile", postData)
    .catch(err => {return {status: 'ERROR'}})

    console.log(uploadFileOutput)
    // return verifyOutput.data;
     if (uploadFileOutput.status === 200 || uploadFileOutput.data){
         return uploadFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const fetchAllFiles = async () => {

    const allFileOutput = await axios.get("http://localhost:7227/drive/getAllFiles")
    .catch(err => {return {status: 'ERROR'}})

    console.log(allFileOutput)
    // return verifyOutput.data;
     if (allFileOutput.status === 200 || allFileOutput.data){
         return allFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const createFolder = async () => {

    const folder = await axios.get("http://localhost:7227/drive/createFolder")
    .catch(err => {return {status: 'ERROR'}})

    console.log(folder)
    // return verifyOutput.data;
     if (folder.status === 200 || folder.data){
         return folder.data;
     } else{
         return {status: 'ERROR'}
     }
}