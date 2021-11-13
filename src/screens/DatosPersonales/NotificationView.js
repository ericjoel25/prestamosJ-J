import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import {SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, StatusBar } from "react-native";
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import 'moment/locale/es-do';
import{AntDesign} from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

export default function NotificacionView(props){


    const{navigation}=props;


  const [formData, setFormData]= useState({});
  const [totalFormData, setTotalFormData]= useState(0);
  const [startFormData, setStartFormData]=useState(null);
  const [isLoading, setIsLoading]= useState(false);
 
  
  const limitData=6;

  useEffect(()=>{
   
    //Obtener el tamaño de todo los dactos
    db.collection('ContratoPrestamo').get().then((snap)=>{
     setTotalFormData(snap.size);
  
   });
  
   //obtener la information de cada arreglo
   const listData = [];
   db.collection('ContratoPrestamo').orderBy('startAt', 'desc').limit(limitData).get().then((response)=>{
     
     setStartFormData(response.docs[response.docs.length - 1]);
  
      response.forEach((doc)=>{
       const formDataInformation = doc.data();
       formDataInformation.id = doc.id;
     
     //  console.log(formDataInformation);
      
     listData.push(formDataInformation);
  
     });
  
     setFormData(listData); 
  
   });
  
}, []);


    return(
        <SafeAreaView style={styles.body}>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor='#913965' />
           
        {
          formData.length > 0 ? (
            <FlatList 
            
            data={formData}
            renderItem={(item)=>(
              <FormData 
              formData={item}
              setFormData={setFormData}
              navigation={navigation}
            
               /> )

            }

              
              ListFooterComponent={<Footer setFormData={setFormData} 
              formData={formData}  setStartFormData={setStartFormData}
              startFormData={startFormData} setIsLoading={setIsLoading}
              />}
                
            />

          ):(

            <View style={{alignSelf: 'center'}}>
            <View style={{ width:120, height:120, borderColor:'red', alignItems:'center'}}>
             <ActivityIndicator style={{alignSelf:'center'}} size='large'/>

            </View>

              <Text style={{fontSize:20, fontWeight:'bold' , textAlign:'center', marginBottom:70, marginTop:-35 }}>Cargando...</Text>

              <View style={styles.ImageContainer}>
                <Image style={styles.Image} source={require('../../component/imagenes/logo.png')} />
              </View>

              <Text style={{marginTop:'68%', marginLeft:-70}}>Power by Eric Marte</Text>


          </View>

          )
        }
    
     
      </SafeAreaView>

    )
}


function Footer (props){

    const{formData, setFormData, setStartFormData, startFormData,
    totalFormData, setIsLoading}=props
  
    const Mas =() =>{    
   
    const string = "No hay más contenido que mostrar. 😅";    
    
    const limitData=6;
  
    const listData2 = [];
  
    formData < totalFormData && setIsLoading(true);
  
    db.collection('ContratoPrestamo').orderBy('startAt', 'desc')
    .startAfter(startFormData.data().startAt)
    .limit(limitData).get().then((response)=>{
  
      if(response.docs.length > 0 ){
  
      setStartFormData(response.docs[response.docs.length - 1]);
  
      }else{
  
        setIsLoading(false);
        alertNoForm()
      }
  
        response.forEach((doc) => {
  
        const formDataInformation = doc.data();
        formDataInformation.id = doc.id;
  
        listData2.push(formDataInformation);
  
        
  
      });
  
      setFormData([...formData, ...listData2]);
  
    });  
      
  
    const alertNoForm = () =>{
  
      Alert.alert(
        'Préstamos J&J',
         string,
        [
          
          {
            text: 'aceptar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
          
        ],
        { cancelable: false }
      );
        
      }
     
  
  
      }
  
      
      return(
        <View style={styles.FooterContainer}>
            <TouchableOpacity style={styles.FooterButton} onPress={()=> Mas()} >
                <AntDesign name="pluscircle" size={60} color="black" />
             </TouchableOpacity>
        </View>
      )
  
    }
  
  function FormData(props){
  
    const {formData, setFormData, navigation, sumaFecha, setSumaFecha}=props
    const {
         Nombre,
         Apellido,
         Pagos,
         NotificationId,
         Plazo
         }=formData.item;    
  


           
  /*const suma = []

  const fecha = FinDeGestación;
  const hoy = new Date();
  const newHoy= moment(hoy,  "DD/MM/YYYY");
  const newFin = moment(fecha, "DD/MM/YYYY");

 let diferencia = moment(newFin).diff(moment(newHoy), 'days');
 
 suma.push(diferencia);

 console.log(FinDeGestación); */
            

  async function scheduleAndCancel(){
        await Notifications.cancelScheduledNotificationAsync(NotificationId);
        
          alert('Notificación Cancelada');
    }
    
  
     return(

    
        <ScrollView >
              
         
         <LinearGradient  colors={['#1e3c72', '#2a5298']} key={NotificationId} style={styles.container}> 
               
            
                
                   
               <View style={styles.FlexContainer}>
                    <Image style={styles.Avatar} source={require('../../component/imagenes/Logo150.png')} />

                    <View style={styles.bodyContainer}>

                        <View style={styles.ViewContainer}>
                        <Text style={styles.NombreAvatar}>{Nombre} {Apellido}</Text>
                        </View>

                        <View style={styles.ViewContainer}>
                            <Text style={styles.AnswerContainer}>Plazo: {Plazo}</Text>
                        </View>

                        <View style={styles.ViewContainer}>
                            <Text style={styles.AnswerContainer}>Monto a paga: {Pagos}$</Text>
                        </View>

                        <TouchableOpacity onPress={()=>scheduleAndCancel()} style={styles.cancelContainer}>
                            <Text style={[styles.AnswerContainer, styles.CancelButton]}>Cancelar</Text>
                        </TouchableOpacity>
                
                           
                       

                    </View>


              </View>
           
               
                
         </LinearGradient>
          
         
         </ScrollView>
     )
    
 }  

 
const styles = StyleSheet.create({
    body: {
      flex:1,
        backgroundColor:'#913965',
    
    },
  
    container: {
     // height:wp('35%'),
      marginTop: hp('2%'),
      marginHorizontal: wp('2%'),
      paddingHorizontal: wp('0%'),
      paddingVertical: hp('0%'),
      borderRadius: wp('7%'),
      marginBottom: hp('2%'),
      paddingBottom: hp('5%'),
      elevation:hp('1%')
  
    },
    ViewContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    AnswerContainer: {
      fontSize: wp('4.1%'),
      color: '#CDD1D3',
      marginHorizontal:wp('1%')
    },

    NombreAvatar:{
      fontSize:wp('5.2%'),
      fontWeight:'bold',
      color:'#fff',
      marginHorizontal:wp('2%')
    },

   bodyContainer:{
    width:wp('70%'),
    marginTop:wp('3%')

  },

  FlexContainer:{
      
      flexDirection:'row', 
      justifyContent:'space-between',
      
  },

  FooterContainer:{
    height:wp('100%'),
    marginTop:wp('40%'),
   // backgroundColor:'red',
    justifyContent:'flex-end'
 
  },
  
  FooterButton:{
    alignSelf:'center',
    alignItems:'center',
    marginBottom:wp('8%'),
    //backgroundColor:'#F2E9D0',
    width:wp('55%'),
    height:hp('8%'),
    borderRadius:wp('20%'),
    marginVertical:hp('15%'),
    paddingTop:hp('2%'),
    //marginTop:hp('70%')
  
  },
  
  FooterTextButton:{
    fontSize:hp('2.5%'),
    fontWeight:'bold'
  
  },
  Image:{
    height:wp('44%'),
    width:wp('44%'),
    margin:wp('2%')
  
  },
  
  ImageContainer:{
    backgroundColor:'#1e3c72',  
    alignItems:'center',
    justifyContent:'center',
    width:wp('50%'),
    height:wp('50%'),
    borderRadius:wp('5%')
    
  },
  Avatar:{
    width:wp('20%'),
    height:wp('20%'),
    margin:wp('2%'),
    marginTop:wp('1%')
  },

  CancelButton:{
    color:'#fff', 
    fontSize:20

  },
  cancelContainer:{
    position:'relative',
    top:wp('5%'),
    left:wp('30%'),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#850A0A',
    marginLeft:10,
    marginRight:5,
    height:wp('10%'),
    width:wp('30%'),
    borderRadius:wp('10%'),
    

  }
  
  
  });