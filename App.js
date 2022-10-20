import React, {useState, useEffect } from "react";
//import {decode, encode} from 'base-64';
import 'react-native-gesture-handler';
import { StyleSheet, LogBox, } from 'react-native';
import Auth from './src/screens/auth';
import firebase from './src/component/firebase/firebase';
import 'firebase/auth';
import  After from './src/navigation/afterLoing';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


//if(!global.btoa) global.btoa = encode;
//if(!global.atob) global.atob =decode;

export default function App(){
 const[user, setUser]= useState(undefined);
  
 useEffect(() =>{
   
  firebase.auth().onAuthStateChanged((response)=>{
    setUser(response);
  })

 }, []);

 if(user === undefined) return null;


  return(   

  
   <>

      {user ? <After /> : <Auth />  }
    
     
   </> 

  )

}

/*function Lougout (){

  const lougout =()=>{
    firebase.auth().signOut();
  }

  return(
    <View>
      <Text>Estas loquedo</Text>
      <Button title='Cerrar sessión' onPress={lougout}/>
    </View>
  )
}*/

const styles = StyleSheet.create({

  background:{
    zIndex:1,
    flex:10,
    height:'150%',

    backgroundColor: "#15212b",
  
  }


})