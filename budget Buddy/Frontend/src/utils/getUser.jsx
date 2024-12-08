import { jwtDecode } from 'jwt-decode';

function getUser(){
    try{
      const token = localStorage.getItem("token")        
      if (!token) return false ; 

      const decoded = jwtDecode(token)
      if(decoded) {
         return decoded 
      }
   }

   catch(err){
      console.log(err);
      
    return false
   }
}

export default getUser