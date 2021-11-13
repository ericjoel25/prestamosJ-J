import React,{useState, Component} from 'react';
import{StyleSheet, View ,Text, TouchableOpacity, TextInput, SafeAreaView, Image, StatusBar, Alert} from 'react-native';
import{validateEmail} from '../firebase/validación';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function RegisterForm(props){

    const {ChangeForm} =props;
    
 //Guarda los estados del input   
     const[formData, setFormData]= useState(defaultValue());
     const [formError, setFormError] = useState({});

  


    const Register =() =>{
        //Mostrar el error
        let errors ={};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            if(!formData.repeatPassword) errors.repeatPassword=true;
            
            AlertCompleteInfo();

        }else if(!validateEmail(formData.email)){
            errors.email=true;
            AlertCompleteInfo();

        }else if(formData.password != formData.repeatPassword){
            errors.password=true;
            errors.repeatPassword=true;
            AlertCompleteInfo();

        }else if(formData.password.length < 6){
            errors.password=true;
            errors.repeatPassword=true;
            AlertCompleteInfo();

        }else{
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(
                ()=>{ 
                    console.log('Cuenta Creado')
                    AlertSave();
                }
            ).catch(() =>{ 
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                })
            })
            console.log('Todo bien');
        }
        
        
        setFormError(errors);
        

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

     function AlertSave(){

        Alert.alert(
            '¡Excelente! 🤗',
            'La cuenta fue creada satisfactoriamente.',
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
            <SafeAreaView >
                <LinearGradient colors={['#FFAAAA', '#99F2C8']} style={styles.body}>   
                <StatusBar barStyle='light-content' hidden={false} backgroundColor='#D4A883' />

              <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.circulo1}></LinearGradient>
              <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.circulo2}></LinearGradient>

              <LinearGradient colors={['#E3C868', '#AC6529']} style={styles.container}>  
            
                <Image style={styles.logo} source={require('../imagenes/logo.png')} />

              <TextInput style={[styles.Input, formError.email && styles.error]}  
                placeholder='Correo electronico' 
                placeholderTextColor='#969696' 
                onChange={e => setFormData({...formData, email: e.nativeEvent.text})} />

                <TextInput style={[styles.Input, formError.password && styles.error]}
                placeholder='Contraseña' 
                placeholderTextColor='#969696' 
                secureTextEntry={true} 
                onChange={e => setFormData({...formData, password: e.nativeEvent.text})} />

                <TextInput style={[styles.Input, formError.repeatPassword && styles.error]}
                placeholder='Confirmar contraseña' 
                placeholderTextColor='#969696' 
                secureTextEntry={true} 
                onChange={e => setFormData({...formData, repeatPassword: e.nativeEvent.text})} />

                    <TouchableOpacity style={styles.login} onPress={Register}>
                        <Text style={styles.btnText} >Registrarse</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.login} onPress={ChangeForm}>
                        <Text style={styles.btnText} > Iniciar Sesión</Text>
                    </TouchableOpacity>
        
  
                </LinearGradient>
                </LinearGradient>
            </SafeAreaView>

    )

}

function defaultValue(){
    return{
        email:'',
        password:'',
        repeatPassword:'',

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
        position:'relative',
        top:hp('-5%'),
        width:wp('85%'),
        height:hp('60%'),
        alignItems:'center',
        borderRadius:wp('10%'),
        elevation:hp('1.5%')

    },
    logo:{
        position:'relative',
        top:hp('-8%'),
        height:wp('30'),
        width:wp('30%')

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
    btnText:{
        color: '#fff',
        fontSize:wp('6.5%'),
        fontWeight:'bold',
        marginBottom:hp('4%'),
        
    },

 
    login:{
         display:'flex',
         position:'relative',
         top:hp('-2%'),
         justifyContent:'center',
         alignItems:'center',
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