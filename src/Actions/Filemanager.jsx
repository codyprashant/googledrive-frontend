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
    const uploadFileOutput = await axios.post("https://drivecloneapp.herokuapp.com/drive/uploadSingleFile", postData)
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

    const allFileOutput = await axios.get("https://drivecloneapp.herokuapp.com/drive/getAllFiles")
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

    const folder = await axios.get("https://drivecloneapp.herokuapp.com/drive/createFolder")
    .catch(err => {return {status: 'ERROR'}})

    console.log(folder)
    // return verifyOutput.data;
     if (folder.status === 200 || folder.data){
         return folder.data;
     } else{
         return {status: 'ERROR'}
     }
}