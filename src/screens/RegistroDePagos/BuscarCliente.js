
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TextInput, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { FireSQL } from 'firesql';
import 'firesql/rx';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const db = firebase.firestore(firebase);

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

export default function BuscarCliente(props) {

  const { navigation } = props;


  const [search, setSearch] = useState('');
  const [formData, setFormdata] = useState([]);
  const [isloading, setIsloading]=useState(false)

  //console.log(formData);


  useEffect(()=>{
    if(formData.length > 0){
      
      setIsloading(false);

    }else if(formData.length === 0){
      
      setTimeout(()=>{
          setIsloading(false)
        
        },1500)
    }
  },[formData])


  const Buscar = () => {

    if(search !== 0 ){ 
      
      setIsloading(true)
    }

    if (search) {
      fireSQL
        .query(`SELECT * FROM ContratoPrestamo WHERE Nombre LIKE '${search}%'`)
        .then((response) => {

          setFormdata(response);
          
          setIsloading(false)

          if (response.length === 0) {
            setSearch('')
            setIsloading(false)
            alertNoForm();
          }


        });

    }


  }


  const alertNoForm = () => {

    Alert.alert(
      'Préstamos J&J',
      'No se ha encontrado ningun documento con este nombre.',
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

  return (
    <LinearGradient colors={['#7F7FD5', '#91EAE4']}  style={styles.body}>

      <View style={styles.SearchBody}>

        <TextInput style={styles.Search} placeholder='Nombre' placeholderTextColor='#fff'
          onChangeText={(Text) => setSearch(Text)} value={search} />

        <TouchableOpacity style={styles.BuscarBotton} onPress={() => Buscar()}>
          <Text style={styles.BuscarText}>Buscar</Text>
        </TouchableOpacity>

      </View>



      {isloading === true ? (

        <LinearGradient colors={['#7F7FD5', '#91EAE4']} style={styles.loadingContainer}>
          <LinearGradient colors={['#c31432', '#240b36']} style={styles.loadingBody}>
            <ActivityIndicator color='#fff' size={wp('15%')} />
            <Text style={styles.loadingBodyText}>Cargando...</Text>
          </LinearGradient>
        </LinearGradient>

      ) : (
        formData.length > 0 ? (


          <FlatList

            data={formData}
            renderItem={(item) => (
              <FormDestete
                formData={item}
                navigation={navigation}

              />)

            } />

        ) : (

          <NoFoundDestete />

        )

      )}



    </LinearGradient>
  );



}



function NoFoundDestete() {
  return (
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
}


function FormDestete(props) {

  const { formData, navigation } = props;

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
    MontoTotal,
    Hoy,
    id
  } = formData.item;


  const Navigation = () => {
    navigation.navigate('RegistroDePago', { id: id });

  }


  return (

    <ScrollView style={styles.body}>


      <LinearGradient colors={['#1e3c72', '#2a5298']} key={id} style={styles.container}>

        <TouchableOpacity onPress={() => Navigation()}>

          <View style={styles.contratoContainer}>
            <Text style={styles.AnswerContainer}>{NoDeContrato}</Text>
          </View>

          <View style={styles.FlexContainer}>
            <Image style={styles.Avatar} source={require('../../component/imagenes/Logo150.png')} />

            <View style={styles.bodyContainer}>

              <View style={styles.ViewContainer}>
                <Text style={styles.NombreAvatar}>{Nombre}</Text>
                <Text style={styles.NombreAvatar}>{Apellido}</Text>
              </View>

              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer}>Cédula:</Text>
                <Text style={styles.AnswerContainer}>{Cedula}</Text>
              </View>


              <View style={styles.ViewContainer}>
                <Text style={styles.AnswerContainer}>Teléfonno:</Text>
                <Text style={styles.AnswerContainer}>{Teléfonos}</Text>
              </View>

            </View>



          </View>


        </TouchableOpacity>
      </LinearGradient>


    </ScrollView>
  )

}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    //height:wp('100%'),
    //backgroundColor: '#85D7D9',

  },

  SearchBody: {
    backgroundColor: '#036082',
    width: wp('100%'),
    height: wp('19%'),
    flexDirection: 'row'

  },

  Search: {
    backgroundColor: '#0B8FB3',
    width: wp('55%'),
    height: wp('14%'),
    marginLeft: wp('15%'),
    marginTop: hp('1%'),
    borderRadius: wp('5%'),
    paddingLeft: wp('2.5%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff'
  },

  BuscarBotton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B8FB3',
    width: wp('25%'),
    height: wp('14%'),
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
    borderRadius: hp('2.5%'),

  },
  BuscarText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold'
  },

  container: {
    height: wp('35%'),
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
    color: '#CDD1D3',
    marginHorizontal: wp('2%')
  },
  contratoContainer: {
    width: wp('90%'),
    // backgroundColor:'red',
    alignItems: 'flex-end'
  },

  NombreAvatar: {
    fontSize: wp('5.2%'),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: wp('2%')
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    height: hp('5%'),
    backgroundColor: '#0B5A8A',
    marginBottom: hp('2%'),
    marginTop: hp('5%'),
    marginHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    borderRadius: wp('20%'),
  },

  bodyContainer: {
    width: wp('70%'),
  },

  FlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  FooterButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    backgroundColor: '#F2E9D0',
    width: wp('55%'),
    height: hp('8%'),
    borderRadius: wp('20%'),
    marginVertical: hp('15%'),
    paddingTop: hp('2%'),
    marginTop: hp('70%')

  },

  FooterTextButton: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold'

  },
  Image: {
    height: wp('44%'),
    width: wp('44%'),
    margin: wp('2%')


  },

  ImageContainer: {
    backgroundColor: '#A26008',
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
  }





})