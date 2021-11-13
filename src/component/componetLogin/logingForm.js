import React, { useState } from 'react';
import{StyleSheet, Text, TouchableOpacity, TextInput, View, SafeAreaView, Image, StatusBar, Alert } from 'react-native';
import{validateEmail} from '../firebase/validación';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function LogingForm(props){
    const {ChangeForm}=props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError ] = useState({});

    const login = () =>{
       // console.log('Iniciando');
       // console.log(formData);

 //Validar email      
        let errors ={};
        if(!formData.email || !formData.password ){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            
            AlertCompleteInfo()

        }else if(!validateEmail(formData.email)){
            errors.email=true;
            AlertCompleteInfo()
        }else{
          // console.log('Ok');

          firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).catch(()=>{
              setFormError({
                  email: true,
                  password: true,
              });

              AlertCompleteInfo();
          });

         
        }

        setFormError(errors);
        
    };


    const onChange = (e, type) =>{
       // console.log("datas:", e.nativeEvent.text);
      //  console.log('type:', type);

        setFormData({...formData, [type]: e.nativeEvent.text});
    }


 function AlertCompleteInfo(){

    Alert.alert(
        'Validar Información 😎',
        'Correo electrónico o contraseña incorrecta.',
        [
          
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Verificar', onPress: () => console.log('Ok') }
        ],
        { cancelable: false }
      );

 }
    


    return(
            <SafeAreaView>
        <LinearGradient colors={['#FFAAAA', '#99F2C8']} style={styles.body}>       
             <StatusBar barStyle='light-content' hidden={false} backgroundColor='#D4A883' />
           
              <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.circulo1}></LinearGradient>
              <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.circulo2}></LinearGradient>

              <LinearGradient colors={['#E3C868', '#AC6529']}  style={styles.container}>
              
                    <Image style={styles.logo} source={require('../imagenes/logo.png')} />
                    
                        <TextInput style={[styles.Input,  formError.email && styles.error]} 
                        placeholder='Correo electronico' 
                        placeholderTextColor='#969696'  onChange={(e) => onChange(e, "email")}/>

                        <TextInput style={[styles.Input,  formError.password && styles.error]} 
                        placeholder='Contraseña' 
                        secureTextEntry={true} 
                        placeholderTextColor='#969696' onChange={(e) => onChange(e, "password")}/>

                        <TouchableOpacity onPress={login}>
                            <Text style={styles.btnText} >Iniciar sesión</Text>
                        </TouchableOpacity>
                    
                    <View style={styles.login}>
                            <TouchableOpacity  onPress={ChangeForm}>
                                    <Text style={styles.btnText} >Registrarse</Text>
                            </TouchableOpacity>
                    </View>
                        
                </LinearGradient> 
                
            </LinearGradient>     
            </SafeAreaView>

    )

}

function defaultValue(){
    return{

        email: "",
        password:"",
    }
    
}
const styles = StyleSheet.create({

    body:{
        position:'relative',
        top:hp('0%'),
        bottom:hp('0%'),
        height:hp('100%'),
        width:wp('100%'), 
        marginTop:hp('0%'),
        marginBottom:hp('0%'),
        paddingTop:hp('2%'),
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
      position:'absolute',
      top:hp('20%'),
      width:wp('85%'),
      height:hp('55%'),
      alignItems:'center',
      borderRadius:wp('10%'),
      elevation:hp('1.5%')

    },
    logo:{
        position:'relative',
        top:hp('-8%'),
        height:hp('16'),
        width:wp('30%')
    },
    btnText:{
        color: '#fff',
        fontSize:wp('6.5%'),
        fontWeight:'bold',
        marginBottom:hp('6%'),
      
    },
    Input:{
        position:'relative',
        top:hp('-5%'),
        width: wp('80%'),
        height:hp('9%'),
        color:'#fff',
        backgroundColor:'#226D65',
        marginBottom:hp('1%'),
        borderRadius:wp('10%'),
        paddingHorizontal:wp('5%'),
        borderWidth:wp('0.4%'),
        borderColor:'#0C3142',
        fontWeight:'bold',
        fontSize:wp('5%'),   
        borderColor:'#000'       
    
    }, 
    
    error:{
        borderColor:'#940c0c',
        borderWidth:wp('1%')
     },

     circulo1:{
         position:'absolute',
         top:hp('0%'),
         width:wp('100%'),
         height:hp('30%'),
         backgroundColor:'red',
         borderBottomRightRadius:wp('60%')
     },
     circulo2:{
        position:'absolute',
        top:hp('69%'),
        bottom:hp('0%'),
        width:wp('100%'),
        height:hp('40%'),
        backgroundColor:'red',
        borderTopLeftRadius:wp('60%')

     }

 
    
})