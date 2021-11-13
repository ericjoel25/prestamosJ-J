import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es-do';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const db = firebase.firestore(firebase);

export default function RegistroDePago(props){
  
  const{navigation}=props

  //console.log(props.route.params.id)

  const [formError, setFormError]= useState({})
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false); 
  const[formData, setFormData]=useState({
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
    MontoAPagar:'',
    Fecha: moment(date).format("LL"),
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt:new Date()
     
  })



  const CustomerInfo = async ()=>{

    const customer = db.collection('ContratoPrestamo').doc(props.route.params.id)
    const doc = await customer.get();
    const Información = doc.data();

    setFormData({...Información, id: doc.id,});

  
}
 


useEffect(()=>{

  CustomerInfo(props.route.params.id);

},[])


  

  
const handleChangeTest=(name, value) =>{
    
  setFormData({...formData, [name]: value});
  
 //console.log(formData.NoDelCerdo);
}


/* Selecinar Fecha */
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
  


  /* Guardar en una nueva Conleccion Registro de pagos */

  const AddFormData = async () => {
    
    if(!formData.Nombre || !formData.NoDeContrato || !formData.Apellido || !formData.Cedula ||!formData.MontoAPagar){

      alertEmptyForm(); 

    } else{

      await db.collection('RegistroDePagos').add({
        NoDeContrato: formData.NoDeContrato,
        Nombre: formData.Nombre,
        Apellido: formData.Apellido,
        Cedula: formData.Cedula,
        Dirección: formData.Dirección,
        Teléfonos:  formData.Teléfonos,
        Plazo:  formData.Plazo,
        Suma: formData.Suma,
        Interés: formData.Interés,
        Pagos:formData.Pagos,
        MontoTotal: formData.MontoTotal,
        MontoAPagar: formData.MontoAPagar,
        Fecha: moment(date).format("LL"),
        Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        startAt:new Date()
  
      }).then( ()=>  navigation.navigate('TodosLosPagos', {id:formData.id})
          
      )

    }
    
  
  }


// Works on both Android and iOS Save informatión

const Save = () =>{

  Alert.alert(
    'Guardar Información',
    '¿Desea guardar esta información en la base de datos?',
    [
      
      {
        text: 'Verificar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Pagar', onPress:async () =>  await AddFormData() }
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



  
  return(
         
    <ScrollView style={styles.contener} >
    <StatusBar  barStyle='light-content' hidden={false} backgroundColor='#4B1248'/>
            <LinearGradient colors={['#4B1248', '#FFA17F', '#4B1248']} >

       <View style={styles.InputContener}>
          <Text style={styles.TextInput}>No. de contrato:</Text>
          <TextInput style={styles.Input} placeholder='No. de contrato' 
            onChangeText={(value) => handleChangeTest('NoDeContrato', value)} value={formData.NoDeContrato}/>
        </View>

        <View style={styles.InputContener}>
              <Text style={styles.TextInput}> Fecha:</Text>
              <TouchableOpacity>
                  <Text  style={[styles.Input, styles.TextDate]} 
                  onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={formData.Fecha} > {date 
                  ?  moment(date).format("LL") 
                  : 'Fecha'}
                  </Text>
              </TouchableOpacity>
        </View>
   
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Nombre:</Text>
          <TextInput style={styles.Input} placeholder='Nombre' 
            onChangeText={(value) => handleChangeTest('Nombre', value)} value={formData.Nombre}/>
        </View>

        
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Apellido:</Text>
          <TextInput style={styles.Input} placeholder='Apellido' 
          onChangeText={(value) => handleChangeTest('Apellido', value)} value={formData.Apellido}/>
        </View>

        
        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Cédula:</Text>
          <TextInput style={styles.Input} placeholder='Cédula'
           onChangeText={(value) => handleChangeTest('Cedula', value)} value={formData.Cedula}/>
        </View>
      

         <View style={styles.InputContener}>
            <Text style={styles.TextInput}>Monoto A Pagar:</Text>
            <TextInput style={styles.Input} placeholder='Monto a pagar'
            onChangeText={(value) => handleChangeTest('MontoAPagar', value)} value={formData.MontoAPagar}/>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={()=> Save()}>
            <Text style={styles.TextButton} >Pagar</Text>
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
    marginTop:wp('3%'),
    
   //alignItems:'center'
  // justifyContent:'center'

  },
  
  Input:{
     width: wp('95%'),
     height:hp('7%'),
     color:'#000',
     borderRadius:wp('4%'),
     fontSize:hp('2.5%'),
     paddingLeft:wp('3.5'),
     marginLeft:wp('2%'),
     marginBottom:hp('0%'),
     borderColor:'#000',
     borderWidth:wp('0.5%'),
     backgroundColor:'#81a0ac',
     
       
  },


  TextInput:{
     fontSize:hp('2.5%'),
     fontWeight:'bold',
     marginLeft:15,
     color:'#fff'
       
  },
  button:{
     alignItems:'center',
     width:wp('70%'),
     height:hp('9%'),
     backgroundColor:'#611257',
     marginBottom:hp('8%'),
     marginTop:hp('3%'),
     marginHorizontal:wp('13%'),
     justifyContent:'center',
     borderRadius:wp('5%'),
     
  },

 TextButton:{
      fontSize:hp('4%'),
      fontWeight:'bold',
      color:'#fff'
      

 },
 TextDate:{
     paddingTop:hp('2%'),
     paddingLeft:hp('0.5%')
 },

 Texttitle:{
   fontSize:hp('2%'),
   textAlign:'center',
   fontWeight:'bold',
  // marginTop:2

 }
  
  })