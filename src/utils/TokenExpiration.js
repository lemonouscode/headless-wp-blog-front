export const parseJwt = (token) => {  

    if(!token){
        return
    }
    const decode = JSON.parse(atob(token.split('.')[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("jwt_token");
        console.log('Token Expired');
    }else{
        // Token is still valid
        return true;
    }
};