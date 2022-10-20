import React, { useState, useEffect, useRef } from 'react';
import {
  View, ScrollView, Text, TouchableOpacity, TextInput,
  StyleSheet, StatusBar, Alert, Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../component/firebase/firebase';
import '@firebase/firestore'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Instant } from '../../component/globalStyle/Instant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const db = firebase.firestore(firebase);


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default function DatosPersonales(props) {

  const { navigation } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalTex]= useState('')
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [time, setTime] = useState('');

  const [formError, setFormError] = useState({})
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [Pago, SetPago] = useState('');
  const [MontoTotal, setMontoTotal] = useState('');
  const [fromPrestamo, setFormPrestamo] = useState({
    NoDeContrato: '',
    Nombre: '',
    Apellido: '',
    Cedula: '',
    Dirección: '',
    Teléfonos: '',
    Intervalo:modalText,
    NumeroDeMeses:'',
    Plazo: '',
    Suma: '',
    Cuota: '',
    Interés: '',
    Pagos: '',
    MontoTotal: '',
    InicialDate: Instant.RegularFormatHoy(date),
    Fecha: Instant.MiniFormatHoy(date),
    Hoy: Instant.LongFormat(date),
    startAt: new Date()
  })


  //console.log(Instant.RegularFormat(date))

  useEffect(() => {

     Calcular()

  })



  console.log(fromPrestamo.NumeroDeMeses)



  //optener los datos
  const handleChangeTest = (name, value) => {

    setFormPrestamo({ ...fromPrestamo, [name]: value });

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
  const Save = () => {

    Alert.alert(
      'Guardar Información',
      '¿Desea guardar esta información en la base de datos?',
      [

        {
          text: 'Verificar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Guardar', onPress: async () => await schedulePushNotification() }
      ],
      { cancelable: false }
    );

  }

  //Alerta
  const alertEmptyForm = () => {

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


  function Calcular(){
    let Capital = parseFloat(fromPrestamo.Suma);
    let Cuota = parseFloat(fromPrestamo.Plazo);
    let Meses = parseFloat(fromPrestamo.NumeroDeMeses); 
    let Interés = parseFloat(fromPrestamo.Interés);
    
    let MontoTotal = ((Capital * (Interés/100)) * Meses) + Capital;
    let Pago = MontoTotal/Cuota;

    setMontoTotal(MontoTotal);
    SetPago(Pago)


  }


  //alerta
  const alertNotificacion = () => {

    const Mensaje = `Se programó el envio de una notificación`;

    Alert.alert(
      'Préstamos J&J',
      Mensaje,
      [

        {
          text: 'Aceptar',
          onPress: () => console.log('Done'),
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

    if (!fromPrestamo.Nombre || !fromPrestamo.Apellido || !fromPrestamo.Cedula || !fromPrestamo.Dirección ||
      !fromPrestamo.Teléfonos || !fromPrestamo.Plazo || !fromPrestamo.Suma ||
      !fromPrestamo.Interés || !modalText
    ) {

      alertEmptyForm();

    } else {


      const bodyMS = `${fromPrestamo.Nombre} ${fromPrestamo.Apellido} tiene que pagar hoy.`;
      console.log(bodyMS);

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Préstamos J&J 📬",
          body: bodyMS,
        },
        trigger: { seconds: time, repeats: true },
      })

      console.log(identifier);



      //   console.log(formData);
      await db.collection('ContratoPrestamo').add({
        NoDeContrato: fromPrestamo.NoDeContrato,
        Nombre: fromPrestamo.Nombre,
        Apellido: fromPrestamo.Apellido,
        Cedula: fromPrestamo.Cedula,
        Dirección: fromPrestamo.Dirección,
        Teléfonos: fromPrestamo.Teléfonos,
        Intervalo:modalText,
        NumeroDeMeses:fromPrestamo.NumeroDeMeses,
        Plazo: fromPrestamo.Plazo,
        Suma: fromPrestamo.Suma,
        Interés: fromPrestamo.Interés,
        Pagos: Pago,
        MontoTotal: MontoTotal,
        NotificationId: identifier,
        InicialDate: Instant.RegularFormatHoy(date),
        Fecha: Instant.MiniFormatHoy(date),
        Hoy: Instant.LongFormat(date),
        startAt: new Date()

      }).then(() => {

        alertNotificacion()
        console.log('Save');

      })



    }

    setFormPrestamo({
      NoDeContrato: '',
      Nombre: '',
      Apellido: '',
      Cedula: '',
      Dirección: '',
      Teléfonos: '',
      Plazo: '',
      Suma: '',
      Interés: '',
      Pagos: '',
      MontoTotal: '',
      Intervalo:'',
      InicialDate: Instant.RegularFormat(date),
      Fecha: Instant.MiniFormat(date),
      Hoy: Instant.LongFormat(date),
      startAt: new Date()

    })

    SetPago('');
    setFormError(errors);



  }


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


  const ShowIntervalo = () => {
     
    const handeChange=(valor, time)=>{
      setModalTex(valor)
      setTime(time);
      setIsOpen(false);
     
    }
    
  return (
      <Modal transparent={true} visible={isOpen}>
        <View style={styles.showIntervaloContainer}>

          <LinearGradient colors={['#FFDEB7', '#89253e']} style={styles.showIntervaloBody}>

            <LinearGradient colors={['#3a6186', '#89253e']} style={styles.showIntervaloHeader}>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.showIntervaloBotonText}>Cerrar</Text>
              </TouchableOpacity>
            </LinearGradient>


            <View style={styles.showIntervaloSupBody}>

              <TouchableOpacity onPress={() => handeChange('Diario', 86400)}>
                <LinearGradient style={styles.showIntervaloBoton} colors={['#3a6186', '#85D7D9']}>
                  <Text style={styles.showIntervaloBotonText} >Diario</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handeChange('Semanales', 604800)}>
                <LinearGradient style={styles.showIntervaloBoton} colors={['#3a6186', '#85D7D9']}>
                  <Text style={styles.showIntervaloBotonText} >Semanales</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handeChange('Quincenales', 1296000)}>
                <LinearGradient style={styles.showIntervaloBoton} colors={['#3a6186', '#85D7D9']}>
                  <Text style={styles.showIntervaloBotonText} >Quincenales</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handeChange('Mensuales', 2592000)}>
                <LinearGradient style={styles.showIntervaloBoton} colors={['#3a6186', '#85D7D9']}>
                  <Text style={styles.showIntervaloBotonText} >Mensuales</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>


          </LinearGradient>

        </View>
      </Modal>
    )
  }

  return (

    <ScrollView >

      <LinearGradient colors={['#FFDEB7', '#9A6696']} style={styles.contener} >

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>No. de contrato:</Text>
          <TextInput style={styles.Input} placeholder='No. de contrato'
            onChangeText={(value) => handleChangeTest('NoDeContrato', value)} value={fromPrestamo.NoDeContrato} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Nombre:</Text>
          <TextInput style={styles.Input} placeholder='Nombre'
            onChangeText={(value) => handleChangeTest('Nombre', value)} value={fromPrestamo.Nombre} />
        </View>


        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Apellido:</Text>
          <TextInput style={styles.Input} placeholder='Apellido'
            onChangeText={(value) => handleChangeTest('Apellido', value)} value={fromPrestamo.Apellido} />
        </View>


        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Cédula:</Text>
          <TextInput style={styles.Input} placeholder='Cédula'
            onChangeText={(value) => handleChangeTest('Cedula', value)} value={fromPrestamo.Cedula} />
        </View>


        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Dirección:</Text>
          <TextInput style={styles.Input} placeholder='Dirección'
            onChangeText={(value) => handleChangeTest('Dirección', value)} value={fromPrestamo.Dirección} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Teléfonos:</Text>
          <TextInput style={styles.Input} placeholder='Teléfonos'
            onChangeText={(value) => handleChangeTest('Teléfonos', value)} value={fromPrestamo.Teléfonos} />
        </View>


        <View style={styles.InputContener}>
          <Text style={styles.TextInput}> Periodo De Pago:</Text>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Text style={[styles.Input, styles.TextDate]}  onChangeText={(value) => handleChangeTest('Intervalo', value)} value={fromPrestamo.Intervalo}>{modalText? modalText:'Periodo De Pago'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>La suma de:</Text>
          <TextInput style={styles.Input} placeholder='La suma de'
            onChangeText={(value) => handleChangeTest('Suma', value)} value={fromPrestamo.Suma} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Numero de meses:</Text>
          <TextInput style={styles.Input} placeholder='Numero de meses'
            onChangeText={(value) => handleChangeTest('NumeroDeMeses', value)} value={fromPrestamo.NumeroDeMeses} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Plazo de:</Text>
          <TextInput style={styles.Input} placeholder='Cuota'
            onChangeText={(value) => handleChangeTest('Plazo', value)} value={fromPrestamo.Plazo} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Taza De Interés :</Text>
          <TextInput style={styles.Input} placeholder='Interés'
            onChangeText={(value) => handleChangeTest('Interés', value)} value={fromPrestamo.Interés} />
        </View>

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}>Pagos por cuotas:</Text>
          <Text style={[styles.Input, styles.TextDate]} > {Pago !== 'NaN' && Pago
            ? Pago : 'Pagos por cuotas'}  </Text>
        </View>

  

        <View style={styles.InputContener}>
          <Text style={styles.TextInput}> Fecha:</Text>

          <TouchableOpacity>
            <Text style={[styles.Input, styles.TextDate]}
              onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={fromPrestamo.Fecha} > {date
                ? Instant.MiniFormatHoy(date)
                : 'Fecha'}
            </Text>
          </TouchableOpacity>

        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => Save()}>
            <Text style={styles.TextButton} >Guardar</Text>
          </TouchableOpacity>
        </View>


        <View>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('InfoDatosPersonales')}>
            <Text style={styles.TextButton} >Mostrar</Text>
          </TouchableOpacity>
        </View>


        <ShowIntervalo />

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


  contener: {
    flex: 1,
    height: '100%',
    //backgroundColor: '#D2F39C',


  },

  InputContener: {
    //flexDirection:'row',
    marginTop: 10,

    // alignItems:'center'

  },

  Input: {
    width: '95%',
    height: 55,
    color: '#000',
    borderRadius: 15,
    fontSize: 20,
    paddingLeft: 15,
    marginLeft: 10,
    marginBottom: 0,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: '#81a0ac',


  },


  TextInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 15,
    color: '#000'

  },
  button: {
    alignItems: 'center',
    width: '70%',
    height: 65,
    backgroundColor: '#24243e',
    marginBottom: 5,
    marginTop: 20,
    marginHorizontal: 58,
    paddingTop: 7,
    borderRadius: 20,

  },
  button1: {
    alignItems: 'center',
    width: '70%',
    height: 65,
    backgroundColor: '#24243e',
    marginBottom: 40,
    marginTop: 15,
    marginHorizontal: 58,
    paddingTop: 7,
    borderRadius: 20,

  },
  TextButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'


  },
  TextDate: {
    paddingTop: 4,
    paddingTop: 8
  },

  Texttitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 2


  },
  showIntervaloContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showIntervaloBody: {
    width: wp('80%'),
    height: wp('100%'),
    backgroundColor: '#fff',
    borderRadius: wp('5%'),


  },
  showIntervaloHeader: {
    height: wp('15%'),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%')
  },
  showIntervaloSupBody: {
    flex: 1,
    alignItems: 'center'
  },
  showIntervaloBoton: {
    width: wp('50%'),
    height: wp('15%'),
    backgroundColor: 'blue',
    margin: wp('2%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  showIntervaloBotonText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff'
  }


})