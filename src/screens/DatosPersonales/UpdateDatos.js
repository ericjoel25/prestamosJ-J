import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es-do';
import firebase from '../../component/firebase/firebase';
import {FireSQL} from 'firesql';
import 'firesql/rx';
import '@firebase/firestore'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);
const fireSQL = new FireSQL(firebase.firestore(),{includeId: 'id'});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default function UpdateDatos(props){

    const {navigation}=props;


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [time, setTime]=useState('');
    
    const [formError, setFormError]= useState({})
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false); 
    const [Pago, SetPago]=useState('');
    const [MontoTotal, setMontoTotal]=useState('');
    const [deletePago, SetDeletePago] = useState([]);
    const [fromPrestamo, setFormPrestamo]= useState({
        NoDeContrato:'',
        Nombre:'',
        Apellido:'',
        Cedula:'',
        Dirección:'',
        Teléfonos:'',
        Plazo:'',
        Suma:'',
        Cuota:'',
        Interés:'',
        Pagos:'',
        MontoTotal:'',
        Fecha: moment(date).format("LL"),
        Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        startAt:new Date()
    })
    

    
    console.log(deletePago.id)
       
    /** Buscar Información Para Actualizar */

    const CustomerInfo = async ()=>{

        const customer = db.collection('ContratoPrestamo').doc(props.route.params.id)
        const doc = await customer.get();
        const Información = doc.data();
    
        setFormPrestamo({...Información, id: doc.id,});
    
    }

    useEffect(()=>{
    
        CustomerInfo(props.route.params.id);
        
      },[])
     
    
    
 /*********** */
    

 
 const eliminarPagos = ()=>{

    if (fromPrestamo.Cedula) {
      fireSQL
        .query(`SELECT * FROM RegistroDePagos WHERE Cedula LIKE '${fromPrestamo.Cedula}%'`)
        .then((response) => {
                
             response.forEach((doc)=>{

               db.collection('RegistroDePagos').doc(doc.id).delete()
               .then(()=> alert('Todos los pagos fueron eliminados'))
               .catch(function(error) {
                     console.error("Error removing document: ", error);
                 });

             })
           
          
            if(response.length === 0){
              alertNoForm();
            }  

         
        });
       
      }
      
     
  }
 


  
  const alertNoForm = () =>{

    Alert.alert(
      'Prestamos J&J',
      'No se ha encontrado ningun Pago de este cliente.',
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

    useEffect(()=>{
 
      calcular()
      
    
    })

 
  
 



//optener los datos
    const handleChangeTest=(name, value) =>{
    
        setFormPrestamo({...fromPrestamo, [name]: value});
        
       //console.log(formData.NoDelCerdo);
     }


     const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
         
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      
      };
    
      const showDatepicker = () => {
        showMode('date');
        
      }; 
      
 


// Works on both Android and iOS Save informatión
const Save = () =>{

    Alert.alert(
      'Actualizar Información',
      'Si actualiza esta información, todos los pagos se eliminarán.',
      [
        
        {
          text: 'Verificar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Actualizar', onPress:async () =>  await schedulePushNotification() }
      ],
      { cancelable: false }
    );
      
    }

//Alerta
const alertEmptyForm = () =>{

    Alert.alert(
      'Préstamos J&J',
      '¡Por favor complete el formulario! 😅',
      [
        
        {
          text: 'Completar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
        
      ],
      { cancelable: false }
    );
      
    }

   function calcular(){
      let capital = parseFloat(fromPrestamo.Suma);
      let Cuota = parseFloat(fromPrestamo.Plazo);

      if(Cuota == 13 ){
        const redito =(10/100);
        let interes = capital * redito * 3;
        
        let montoTotal = interes + capital;
        let Pagos = (montoTotal/Cuota);

        let montoTotal2 = montoTotal.toString();
        let pagos2 = Pagos.toString();
        
        const time = 604800;
        setMontoTotal(montoTotal2);
        SetPago(pagos2);
        setTime(time);

      }else if(Cuota == 8 ){
        const redito =(10/100);
        let interes = capital * redito * 4;
        let montoTotal = interes + capital;
        let Pagos = (montoTotal/Cuota);

        let montoTotal2 = montoTotal.toString();
        let pagos2 = Pagos.toString();
        
        const time = 1296000;

        setMontoTotal(montoTotal2);
        SetPago(pagos2);
        setTime(time);

      } else if (Cuota == 24){
        const redito =(10/100);
        let interes = capital * redito * 2;
        let montoTotal = interes + capital;
        let Pagos = (montoTotal/Cuota);
        
        let montoTotal2 = montoTotal.toString();
        let pagos2 = Pagos.toString();
       
        const time = 86400;

        setMontoTotal(montoTotal2);
        SetPago(pagos2);
        setTime(time);


      }else if(Cuota == 6){
        const redito =(10/100);
        let interes = capital * redito * 3;
        let montoTotal = interes + capital;
        let Pagos = (montoTotal/Cuota);

        let montoTotal2 = montoTotal.toString();
        let pagos2 = Pagos.toString();
        
        const time = 1296000;

        setMontoTotal(montoTotal2);
        SetPago(pagos2);
        setTime(time);

      }
       
    }

    
//alerta
  const alertNotificacion = () =>{

    const Mensaje = `Se programó el envio de una notificación`;

    Alert.alert(
      'Préstamos J&J',
       Mensaje,
      [
        
        {
          text: 'Aceptar',
            onPress: () => eliminarPagos(),
          style: 'cancel'
        }
        
      ],
      { cancelable: false }
    );
      
    }
  
 /* Notificaciones  inicio del codigo */

/*function scheduleAndCancel(){
   Notifications.cancelAllScheduledNotificationsAsync()
        .then(() => {
          console.log('Done clearing local notifications.');
          resolve();
        })
        .catch(err => {
          console.log('Unable to clear local notifications.');
          reject(err);
        })
}*/

 async function schedulePushNotification() {

    
  let errors = {};

  if(!fromPrestamo.Nombre|| !fromPrestamo.Apellido || !fromPrestamo.Cedula || !fromPrestamo.Dirección ||
      !fromPrestamo.Teléfonos || !fromPrestamo.Plazo || !fromPrestamo.Suma ||
      !fromPrestamo.Interés         
     ){

      alertEmptyForm();

    }else{

       
      const bodyMS= `${fromPrestamo.Nombre} ${fromPrestamo.Apellido} tiene que pagar hoy.`;
      console.log(bodyMS);
  
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Préstamos J&J 📬",
          body: bodyMS,
        },
        trigger: { seconds: time, repeats:true },
      }) 

      console.log(identifier);
  

     
   //   console.log(formData);
   await db.collection('ContratoPrestamo').doc(props.route.params.id).update({
    NoDeContrato: fromPrestamo.NoDeContrato,
    Nombre: fromPrestamo.Nombre,
    Apellido: fromPrestamo.Apellido,
    Cedula: fromPrestamo.Cedula,
    Dirección: fromPrestamo.Dirección,
    Teléfonos:  fromPrestamo.Teléfonos,
    Plazo:  fromPrestamo.Plazo,
    Suma: fromPrestamo.Suma,
    Interés: fromPrestamo.Interés,
    Pagos:Pago,
    MontoTotal: MontoTotal,
    NotificationId:identifier,
    Fecha: moment(date).format("LL"),
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt:new Date()

   }).then(()=>{

    alertNotificacion()
  //  console.log('Save');
  //  eliminarPagos()
  
     
   })

    

   } 

   setFormPrestamo({
    NoDeContrato:'',
    Nombre:'',
    Apellido:'',
    Cedula:'',
    Dirección:'',
    Teléfonos:'',
    Plazo:'',
    Suma:'',
    Interés:'',
    Pagos:'',
    MontoTotal:'',
    Fecha: moment(date).format("LL"),
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt:new Date()

  })

  SetPago('');
  setFormError(errors);
   


}

/* Parte de la notificación */

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);



  /*async function scheduleAndCancel(){
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    
    alert(notificationId);

 }*/

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
   
   return(
     
    <ScrollView >
  
      <LinearGradient colors={['#FFDEB7', '#9A6696']} style={styles.contener} >

       <View style={styles.InputContener}>
          <Text style={styles.TextInput}>No. de contrato:</Text>
          <TextInput style={styles.Input} placeholder='No. de contrato' 
            onChangeText={(value) => handleChangeTest('NoDeContrato', value)} value={fromPrestamo.NoDeContrato}/>
        </View>
   
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Nombre:</Text>
          <TextInput style={styles.Input} placeholder='Nombre' 
            onChangeText={(value) => handleChangeTest('Nombre', value)} value={fromPrestamo.Nombre}/>
        </View>

        
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Apellido:</Text>
          <TextInput style={styles.Input} placeholder='Apellido' 
          onChangeText={(value) => handleChangeTest('Apellido', value)} value={fromPrestamo.Apellido}/>
        </View>

        
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Cédula:</Text>
          <TextInput style={styles.Input} placeholder='Cédula'
           onChangeText={(value) => handleChangeTest('Cedula', value)} value={fromPrestamo.Cedula}/>
        </View>

        
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Dirección:</Text>
          <TextInput style={styles.Input} placeholder='Dirección' 
          onChangeText={(value) => handleChangeTest('Dirección', value)} value={fromPrestamo.Dirección}/>
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Teléfonos:</Text>
          <TextInput style={styles.Input} placeholder='Teléfonos' 
          onChangeText={(value) => handleChangeTest('Teléfonos', value)} value={fromPrestamo.Teléfonos}/>
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Me comprometo a pagar en un plazo de :</Text>
          <TextInput style={styles.Input} placeholder='Cuota' 
          onChangeText={(value) => handleChangeTest('Plazo', value)} value={fromPrestamo.Plazo}/>
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>La suma de:</Text>
          <TextInput style={styles.Input} placeholder='La suma de' 
          onChangeText={(value) => handleChangeTest('Suma', value)} value={fromPrestamo.Suma}/>
        </View>

        <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Pagos por cuotas:</Text>
              <Text style={[styles.Input, styles.TextDate]} > {Pago ? Pago : 'Pagos por cuotas'}  </Text>
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>La cual le tome prestado al señor Jose Marte, CED. 052-0009851-4 a un :</Text>
          <TextInput style={styles.Input} placeholder='Interés' 
          onChangeText={(value) => handleChangeTest('Interés', value)} value={fromPrestamo.Interés}/>
        </View>
 
        <View style={styles.InputContener}>
              <Text style={styles.TextInput}> Fecha:</Text>
              
              <TouchableOpacity>
                  <Text  style={[styles.Input, styles.TextDate]} 
                  onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={fromPrestamo.Fecha} > {date 
                  ?  moment(date).format("LL") 
                  : 'Fecha'}
                  </Text>
              </TouchableOpacity>
           
            </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={()=>Save()}>
            <Text style={styles.TextButton} >Actualizar</Text>
          </TouchableOpacity>
        </View>
        

        <View>
          <TouchableOpacity style={styles.button1}  onPress={() => navigation.navigate('InfoDatosPersonales')}>
            <Text style={styles.TextButton} >Mostrar</Text>
          </TouchableOpacity>
        </View>


         
       
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
              />
            )}
        
        </LinearGradient>
     </ScrollView>
   
   )

}


const styles = StyleSheet.create({


    contener:{
      flex:1,
      height:'100%',
    //backgroundColor: '#D2F39C',


    },

   InputContener:{
    //flexDirection:'row',
      marginTop:10,
      
    // alignItems:'center'
  
    },
    
    Input:{
       width: '95%',
       height:55,
       color:'#000',
       borderRadius:15,
       fontSize:20,
       paddingLeft:15,
       marginLeft:10,
       marginBottom:0,
       borderColor:'#000',
       borderWidth:2,
       backgroundColor:'#81a0ac',
       
         
    },
  
  
    TextInput:{
       fontSize:20,
       fontWeight:'bold',
       marginRight:10,
       marginLeft:15,
       color:'#000'
         
    },
    button:{
       alignItems:'center',
       width:'70%',
       height:65,
       backgroundColor:'#24243e',
       marginBottom:5,
       marginTop:20,
       marginHorizontal:58,
       paddingTop:7,
       borderRadius:20,
       
    },
    button1:{
      alignItems:'center',
      width:'70%',
      height:65,
      backgroundColor:'#24243e',
      marginBottom:40,
      marginTop:15,
      marginHorizontal:58,
      paddingTop:7,
      borderRadius:20,
      
   },
   TextButton:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff'
        

   },
   TextDate:{
      paddingTop:2,
      paddingTop:8
   },

   Texttitle:{
     fontSize:25,
     textAlign:'center',
     fontWeight:'bold',
     marginTop:2

     
   }

  
  })