import axios from "axios"
import { toast } from 'react-toastify';
import {BACKEND_URL} from '../constant/serverDetails'

export const signUp = async (email, password, firstName, lastName) => {

    let postData = { email: email, password:password, firstName:firstName, lastName:lastName};
    console.log(postData)
    const signupUser = await axios.post(`${BACKEND_URL}/register`, postData)
    .catch(err => {return {status: 'ERROR'}})

    // console.log(signupUser)
    if (signupUser.status === 200){
        return signupUser.data;
    } else{
        return {status: 'ERROR'}
    }
}

export const login = async (email, password) => {
    console.log(BACKEND_URL)

    let postData = { email: email, password:password};
    const loginUser = await axios.post(`${BACKEND_URL}/login`, postData)
    .catch(err => {return {status: err}})

    // console.log(loginUser)
    if (loginUser.status === 200 || loginUser.data){
        return loginUser.data;
    } else{
        toast.error('Invalid Username or Password')
        return {status: 'ERROR'}
    }
  }

export const verifyAccount = async (encryptedText) => {

    let postData = { encryptedText:encryptedText};
    const verifyOutput = await axios.post(`${BACKEND_URL}/verifyaccount`, postData)
    .catch(err => {return {status: 'ERROR'}})

    // console.log(verifyOutput)
    if (verifyOutput.status === 200 || verifyOutput.data){
        return verifyOutput.data;
    } else{
        console.log(verifyAccount)
        return {status: 'ERROR'}
    }
}

export const resetpassRequest = async (email) => {

    let postData = { email: email};
    const resetReq = await axios.post(`${BACKEND_URL}/resetRequest`, postData)
    .catch(err => {return {status: 'ERROR'}})

    // console.log(resetReq)
    if (resetReq.status === 200 || resetReq.data){
        return resetReq.data;
    } else{
        return {status: 'ERROR'}
    }
}

export const resetpassword = async (encryptedText, password) => {

    let postData = { encryptedText: encryptedText, password:password};
    console.log(postData)
    const resetReq = await axios.post(`${BACKEND_URL}/resetPassword`, postData)
    .catch(err => {return {status: 'ERROR'}})

    // console.log(resetReq)
    if (resetReq.status === 200 || resetReq.data){
        return resetReq.data;
    } else{
        return {status: 'ERROR'}
    }
}

export const verifyResetRequest = async (encryptedText) => {

    let postData = { encryptedText: encryptedText};
    console.log(postData)
    const resetReq = await axios.post(`${BACKEND_URL}/passwordRequestVerify`, postData)
    .catch(err => {return {status: 'ERROR'}})

    // console.log(resetReq)
    if (resetReq.status === 200 || resetReq.data){
        return resetReq.data;
    } else{
        return {status: 'ERROR'}
    }
}