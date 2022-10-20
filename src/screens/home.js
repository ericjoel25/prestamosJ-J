import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { View, StyleSheet, SafeAreaView, Text, StatusBar, TouchableOpacity, Image, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Home(props) {

  const { navigation } = props;


  return (

    <LinearGradient colors={['#FFDEB7', '#85D7D9']} style={styles.container} >

      <StatusBar barStyle='light-content' hidden={false} backgroundColor='#239ECA' />
      <ScrollView>
        <View style={styles.bodyContaineer}>

          <TouchableOpacity onPress={() => navigation.navigate('DatosPersonales')}>
            <LinearGradient colors={['#FFBF70', '#9A6696']} style={styles.button}>
              <Image style={styles.image} source={require('../component/imagenes/Contratos.png')} />
              <Text style={styles.Text}>Contratos Personales</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ListaDeClientes')}>
            <LinearGradient colors={['#FFBF70', '#9A6696']} style={styles.button}>
              <Image style={styles.image} source={require('../component/imagenes/Pago.png')} />
              <Text style={styles.Text}>Realizar Pagos</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>


        <View style={styles.bodyContaineer}>



          <TouchableOpacity onPress={() => navigation.navigate('ListaDePagos')}>
            <LinearGradient colors={['#FFBF70', '#9A6696']} style={styles.button}>
              <Image style={styles.image} source={require('../component/imagenes/Recibo.png')} />
              <Text style={styles.Text}>Recibos Individuales</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('TodosLosPagos')}>
            <LinearGradient colors={['#FFBF70', '#9A6696']} style={styles.button}>
              <Image style={[styles.image, style = { marginTop: wp('-2%'), marginBottom: wp('1%') }]} source={require('../component/imagenes/TodosRecibos.png')} />
              <Text style={styles.Text}>Todos Los Recibos</Text>
            </LinearGradient>
          </TouchableOpacity>


        </View>



      </ScrollView>

      <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.footer}>
      </LinearGradient>

    </LinearGradient>

  )


}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor:"#0B5A8A",
  //  width: wp('100%'),
   // height: wp('100%'),
    alignItems: 'center',
    // marginTop:hp('20%'),
    paddingTop: wp('50%'),


  },


  bodyContaineer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  //  backgroundColor:'red',
    maxWidth: wp('90%'),
    maxHeight: wp('50%'),
    marginBottom: wp('5%'),
   // marginTop:wp('5%'),
    paddingBottom:wp('5%')
    //elevation:hp('1.5%')

  },
  image: {
    position: 'relative',
    top: wp('-2%'),
    width: wp('20%'),
    height: wp('20%'),

  },

  button: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('5%'),
    marginHorizontal: wp('4%'),
    alignItems: "center",
    justifyContent: 'center',

  },
  Text: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: wp('2%')


  },

  footer: {
    position: 'absolute',
    bottom: wp('-10%'),
    backgroundColor: '#036082',
    marginBottom: hp('5%'),
    height: wp('15%'),
    width: wp('100%'),
    alignItems: 'center',
    paddingTop: hp('1%') 

  },

  footerButton: {
    height: hp('5.5%'),
    width: wp('40%'),
    backgroundColor: '#A93226',
    marginTop: hp('-0.1%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center'

  },

  footerText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#fff'
  }

})