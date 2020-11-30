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


export const fetchAllFiles = async () => {

    const allFileOutput = await axios.get("https://drivecloneapp.herokuapp.com/trash/getAllTrashFiles")
    .catch(err => {return {status: 'ERROR'}})

     if (allFileOutput.status === 200 || allFileOutput.data){
         return allFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const deleteFile = async (itemId) => {
    let postData = {itemId:itemId};

    const deleteFileOutput = await axios.post("https://drivecloneapp.herokuapp.com/trash/deleteTrashFile", postData)
    .catch(err => {return {status: 'ERROR'}})
    // console.log(deleteFileOutput)
     if (deleteFileOutput.status === 200 || deleteFileOutput.data){
         return deleteFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

export const restoreFile = async (itemId) => {
    let postData = {itemId:itemId};

    const deleteFileOutput = await axios.post("https://drivecloneapp.herokuapp.com/trash/restoreFile", postData)
    .catch(err => {return {status: 'ERROR'}})
    // console.log(deleteFileOutput)
     if (deleteFileOutput.status === 200 || deleteFileOutput.data){
         return deleteFileOutput.data;
     } else{
         return {status: 'ERROR'}
     }
}

