import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, StatusBar } from "react-native";
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Instant } from "../../component/globalStyle/Instant";


const db = firebase.firestore(firebase);

export default function ListaDeClientes(props) {


  const { navigation } = props;


  const [formData, setFormData] = useState([]);
  const [totalFormData, setTotalFormData] = useState(0);
  const [startFormData, setStartFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date())

  const limitData = 6;




  useEffect(() => {
    if (formData.length > 0) {
      setIsLoading(false);
    } else if (formData.length === 0) {
      setTimeout(() => {
        setIsLoading(false)

      }, 1500)
    }
  }, [formData])


  useEffect(() => {

    //Obtener el tamaño de todo los dactos
    db.collection('ContratoPrestamo').get().then((snap) => {
      setTotalFormData(snap.size);

    });

    //obtener la information de cada arreglo
    const listData = [];
    db.collection('ContratoPrestamo').orderBy('startAt', 'desc').limit(limitData).get().then((response) => {

      setStartFormData(response.docs[response.docs.length - 1]);

      response.forEach((doc) => {
        const formDataInformation = doc.data();
        formDataInformation.id = doc.id;

        //  console.log(formDataInformation);

        listData.push(formDataInformation);

      });

      setFormData(listData);
      if (listData.length > 0) {
        setIsLoading(false)
      }

    });

  }, []);


  return (
    <LinearGradient colors={['#7F7FD5', '#91EAE4']} style={styles.body}>
      <StatusBar barStyle='light-content' hidden={false} backgroundColor='#1372B8' />  

      {isLoading === true ? (

        <LinearGradient colors={['#7F7FD5', '#91EAE4']} style={styles.loadingContainer}>
          <LinearGradient colors={['#c31432', '#240b36']} style={styles.loadingBody}>
            <ActivityIndicator color='#fff' size={wp('15%')} />
            <Text style={styles.loadingBodyText}>Cargando...</Text>
          </LinearGradient>
        </LinearGradient>

      )

        : (
          formData.length > 0 ? (
            <FlatList

              data={formData}
              renderItem={(item) => (
                <FormData
                  formData={item}
                  setFormData={setFormData}
                  navigation={navigation}

                />)

              }


              ListFooterComponent={<Footer setFormData={setFormData}
                formData={formData} setStartFormData={setStartFormData}
                startFormData={startFormData} setIsLoading={setIsLoading}
              />}

            />

          ) : (

            <LinearGradient colors={['#7F7FD5', '#91EAE4']} style={styles.NoDataContainer}>
              <View style={styles.NoDataBody}>
                <Text style={styles.NoDataBodyText}>No hay contenido o internet</Text>
                <View style={styles.ImageContainer}>
                  <Image style={styles.Image} source={require('../../component/imagenes/logo.png')} />
                </View>
              </View>
              <Text style={styles.NoDataContainerText}>Power by Eric Marte</Text>
            </LinearGradient>

          )



        )}



    </LinearGradient>

  )
}


function Footer(props) {

  const { formData, setFormData, setStartFormData, startFormData,
    totalFormData, setIsLoading } = props

  const Mas = () => {

    const string = "No hay más contenido que mostrar. 😅";

    const limitData = 6;

    const listData2 = [];

    formData < totalFormData && setIsLoading(true);

    db.collection('ContratoPrestamo').orderBy('startAt', 'desc')
      .startAfter(startFormData.data().startAt)
      .limit(limitData).get().then((response) => {

        if (response.docs.length > 0) {

          setStartFormData(response.docs[response.docs.length - 1]);

        } else {

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


    const alertNoForm = () => {

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


  return (
    <>
      {formData.length > 5 ? (
        <View style={styles.FooterContainer}>
          <TouchableOpacity style={styles.FooterButton} onPress={() => Mas()} >
            <AntDesign name="pluscircle" size={wp('13%')} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View >
          <View >

          </View>
        </View>
      )

      }
    </>
  )

}

function FormData(props) {

  const { formData, setFormData, navigation } = props
  const {
    NoDeContrato,
    Nombre,
    Apellido,
    Cedula,
    Dirección,
    Teléfonos,
    Plazo,
    Suma,
    Interés,
    Fecha,
    Pagos,
    InicialDate,
    Intervalo,
    MontoTotal,
    Hoy,
    id,
    startAt
  } = formData.item;


  const date = Instant.RegularFormat(InicialDate);
  const time = Instant.MicroTime(date)
  const hoy = new Date()
  const hoyMicro = Instant.RegularFormatHoy(hoy)
  const hoyGetTime = Instant.MicroTime(hoyMicro); 
  
 //const comprovar = Instant.RegularFormat(time)
 //const comprovar2 = Instant.RegularFormat(hoyGetTime)
   const Contador = (time > hoyGetTime)? 0: time

  function nextPayment() {

    const PeriodoDePago ={
       Diario:86400000,
       Semanales:86400000 * 7,
       Quincenales:86400000 * 15,
       Mensuales:86400000 * 30
    }

    const Periodo = PeriodoDePago[Intervalo];


    let Payment = 0


    for (let x = Contador; x <= hoyGetTime; x += Periodo) {

      Payment = x;

    }

    let PaymentDate = new Date(Payment)
    let PaymentDateMicro = Instant.RegularFormat(PaymentDate)
    
    let oldPayment = (PaymentDateMicro === hoyMicro && PaymentDateMicro !== date) ? 'Hoy': (PaymentDateMicro === date)? 'Inicio': Instant.MiniFormat(Payment);
    let newPayment = Payment + Periodo;

    let newTime = new Date(newPayment)

 

    return {
      newTime,
      oldPayment,
      PaymentDateMicro,
      hoyMicro,
      Periodo

    }

  }

   const DayLess = ()=> Instant.DifferenceDays(new Date, nextPayment().newTime) + 1;



  const Navigation = () => {
    navigation.navigate('RegistroDePago', { id: id });

  }




  return (


    <ScrollView >


      <LinearGradient colors={['#1e3c72', '#2a5298']} key={id} style={styles.container}>

        <View>

          <View style={styles.contratoId}>
            <Text style={styles.AnswerContainer}>{NoDeContrato}</Text>
          </View>

          <View style={styles.FlexContainer}>

            <TouchableOpacity onPress={() => Navigation()}>
               <Image style={styles.Avatar} source={require('../../component/imagenes/Logo150.png')} />
            </TouchableOpacity>

            <View style={styles.bodyContainer}>

              <View style={styles.ViewContainer}>
                <Text style={styles.NombreAvatar}>{Nombre} {Apellido}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>Cédula:</Text>
                <Text style={styles.AnswerContainer}>{Cedula}</Text>
              </View>


              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>Teléfonno:</Text>
                <Text style={styles.AnswerContainer}>{Teléfonos}</Text>
              </View>
              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>Plazo:</Text>
                <Text style={styles.AnswerContainer}>{Plazo}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>Día Inicial:</Text>
                <Text style={styles.AnswerContainer}>{Instant.MiniFormat(InicialDate)}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>P. Anterior:</Text>
                <Text style={styles.AnswerContainer}>{nextPayment().oldPayment}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>P. Próximo:</Text>
                <Text style={styles.AnswerContainer}>{Instant ? Instant.MiniFormat(nextPayment().newTime) : 'No hay Fecha'}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer2}>Dias Restantes:</Text>
                <Text style={styles.AnswerContainer}>{(DayLess() === 1)?`${DayLess()} día`:`${DayLess()} dias`}</Text>
              </View>



            </View>



          </View>


        </View>
      </LinearGradient>


    </ScrollView>


  )

}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    //height:wp('100%'),
    backgroundColor: '#85D7D9',

  },

  container: {
    minHeight: wp('35%'),
    marginTop: hp('2%'),
    marginHorizontal: wp('2%'),
    paddingHorizontal: wp('0%'),
    paddingVertical: hp('0%'),
    borderRadius: wp('7%'),
    marginBottom: hp('2%'),
    paddingBottom: hp('5%'),
    elevation: hp('1%')

  },
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  AnswerContainer: {
    fontSize: wp('4.1%'),
    color: '#9E9E9E',
    marginHorizontal: wp('1%')
  },
  AnswerContainer2:{
    fontSize: wp('4.1%'),
    color: '#DBDBDB',
    marginHorizontal: wp('1%'),
    fontWeight:'bold'
  },
  contratoId: {
    width: wp('90%'),
    // backgroundColor:'red',
    alignItems: 'flex-end'

  },

  timeContainer: {
    position: 'relative',
    top: wp('4%'),
    left: wp('-15%'),
    // backgroundColor:'red',

  },

  NombreAvatar: {
    fontSize: wp('5.2%'),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: wp('2%')
  },


  bodyContainer: {
    width: wp('70%'),

  },

  FlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  FooterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  FooterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#F2E9D0',
    width: wp('55%'),
    height: wp('24%'),
    borderRadius: wp('5%'),



  },

  FooterTextButton: {
    fontSize: 20,
    fontWeight: 'bold'

  },
  Image: {
    height: wp('44%'),
    width: wp('44%'),
    margin: wp('2%')

  },

  ImageContainer: {
    backgroundColor: '#1e3c72',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('5%')

  },
  Avatar: {
    width: wp('20%'),
    height: wp('20%')
  },
  loadingContainer: {
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',


  },
  loadingBody: {
    height: wp('30%'),
    width: wp('80%'),
    backgroundColor: 'red',
    borderRadius: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%')

  },
  loadingBodyText: {
    fontSize: wp('6%'),
    color: '#fff',
    marginHorizontal: wp('5%'),
    fontWeight: 'bold'
  },
  NoDataContainer: {
    height: '100%',
    alignItems: 'center'
  },
  NoDataBody: {
    height: wp('80%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  NoDataBodyText: {
    fontSize: wp('5%'),
    marginBottom: wp('5%'),
    color: '#fff',
    fontWeight: 'bold'
  },
  NoDataContainerText: {
    position: 'absolute',
    top: wp('140%')
  },

  NoDataContainer: {
    height: '100%',
    alignItems: 'center'
  },
  NoDataBody: {
    height: wp('80%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  NoDataBodyText: {
    fontSize: wp('5%'),
    marginBottom: wp('5%'),
    color: '#fff',
    fontWeight: 'bold'
  },
  NoDataContainerText: {
    position: 'absolute',
    top: wp('140%')
  }


});