import React, {useState} from "react";
import 'react-native-gesture-handler';
import LogingForm from '../component/componetLogin/logingForm';
import RegisterForm from '../component/componetLogin/registerForm';


export default function Auth(){
   const [isLogin, setIsLogin] = useState(true);
   const ChangeForm = () =>{
     setIsLogin(!isLogin);
   }

  return(
        
          
        <>
          {isLogin ? ( <LogingForm ChangeForm={ChangeForm} /> ) : ( <RegisterForm ChangeForm={ChangeForm} /> )}

       </>        
    
   
  )

}

