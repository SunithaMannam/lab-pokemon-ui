import axios from 'axios';

const service = axios.create({ baseURL: "http://localhost:5000/"});

// signup 
export const userSignUp = (signupInfo) => {
    return service.post("user/signup",signupInfo)
    .then((signUpResp) =>  signUpResp.data)
    .catch((error) => console.log(error));
}

// login 
export const userLogin = (loginDetails) => {
    return service.post("user/login",loginDetails)
    .then((loginResp) =>   loginResp.data)
    .catch((error) => console.log(error));
}

export const validateSession = (accessToken) => {
    console.log(" Validate user service called ");
    return service
    .get(`user/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const userLogout = (accessToken) => {
  return service
    .delete(`user/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
