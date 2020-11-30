import axios from "axios"

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
    const uploadFileOutput = await axios.post("https://drivecloneapp.herokuapp.com/share/uploadSharingFile", postData)
    .catch(err => {return {status: 'ERROR'}})


     if (uploadFileOutput.status === 200 || uploadFileOutput.data){
         return uploadFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const fetchAllFiles = async () => {

    const allFileOutput = await axios.get("https://drivecloneapp.herokuapp.com/share/getAllSharedFiles")
    .catch(err => {return {status: 'ERROR'}})


     if (allFileOutput.status === 200 || allFileOutput.data){
         return allFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}