const showError = ( err ) => {
    if( err.response ){
        if(err.response.status === 401 && err.response.data === "unauth"){
            return {
                msg: "you are not auth to access resource",
                status: err.response.status
            }
        }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            return {
                msg: "please provide token",
                status: err.response.status
            }
        }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            return {
                msg: "please provide valid token",
                status: err.response.status
            }
        }else{
            return {
                msg: "Server Error, Please try Again",
                status: err.response.status
            }
        }
    }else{
        return {
            msg: "Server Error, Please try Again",
            status: err.response.status
        }
    }
}

export default showError;