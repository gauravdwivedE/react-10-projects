import  jwt  from 'jsonwebtoken';

const genToken = (payLoad) =>{
    return  jwt.sign(payLoad,process.env.jwtSecret,{expiresIn:"24h"}) // paload,secret{expiry}
}

export default genToken