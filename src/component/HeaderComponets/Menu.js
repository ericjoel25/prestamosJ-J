import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from '../firebase/firebase';
import {Ionicons } from '@expo/vector-icons';


export default function Mune(props) {

    const alertNoForm = () => {

        Alert.alert(
            'Prestamos J&J',
            '¿Está seguro que desea cerrar sesión?',
            [


                { text: "Cancelar", onPress: () => console.log('Cancelado') },

                {
                    text: 'aceptar',
                    onPress: () => firebase.auth().signOut(),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );

    }

    function DrawerMune(props) {
        return (
            <TouchableOpacity onPress={props.navigation}>
                <View style={styles.DrawerContainer}>
                    <Ionicons size={hp('4%')} name={props.icon} style={styles.Ionicon} />
                    <Text style={styles.textDrawer}>{props.titelName}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../imagenes/Logo150.png')} />
                <Text style={styles.logoText}>José Marte</Text>
            </View>


            <DrawerMune icon='home' titelName='Inicio' navigation={() => props.navigation.navigate('Home')} />
            <DrawerMune icon='person' titelName='Lista De Clientes' navigation={() => props.navigation.navigate('ListaDeClientes')} />
            <DrawerMune icon='cash-outline' titelName='Todos Los Pagos' navigation={() => props.navigation.navigate('TodosLosPagos')} />
            <DrawerMune icon='notifications' titelName='Notificaciones' navigation={() => props.navigation.navigate('NotificationView')} />

            <TouchableOpacity style={styles.footerButton} onPress={() => alertNoForm()} >
                <Text style={styles.footerText} > Cerrar Sesión </Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        position:'relative',
        height:'100%',
       // backgroundColor:'red',
   
    },

    logoContainer: {
        position: 'relative',
        backgroundColor: '#226D65',
        flexDirection: 'row',
        marginBottom: wp('4%'),
        height: wp('25%'),
        borderTopRightRadius: wp('3%')
    },
    logo: {
        position:'relative',
        top:wp('4%'),
        left:wp('1%'),
        width: wp('20%'),
        height: wp('20%')

    },

    logoText: {
        position: 'relative',
        top: wp('19%'),
        left:wp('10%'),
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        color: '#fff'

    },
    footerButton: {
        position: 'absolute',
        top:'95%',
        height: wp('10%'),
        width: wp('60%'),
        alignSelf: 'center',
        backgroundColor: '#226D65',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: wp('3%'),
    },
    footerText: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#fff', 
        marginBottom:wp('4%')
    },

    DrawerContainer: {
        height: wp('16%'),
        flexDirection: 'row',
        backgroundColor: '#226D65',
        marginBottom: hp('1.5%'),
        alignItems: 'center',
        borderRadius: wp('4%'),
        marginHorizontal: wp('2%'),
        justifyContent:'flex-start'
 
    },
    Ionicon:{
       marginHorizontal:wp('2%')
    },
    textDrawer: {
        fontSize: wp('4.5%'),
        paddingTop: hp('1%'),
        color: '#fff'
    }

})