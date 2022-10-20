import React from 'react';
import{StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import{MaterialIcons} from '@expo/vector-icons';
import Navigation from '../../navigation/navigation';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SimpleLineIcons } from '@expo/vector-icons'; 


export default function HomeHeader(props){


 const{navigation}=props;
        

    
 return(
    <LinearGradient colors={['#226D65', '#09B6AE']} style={styles.Header}>
      
        <TouchableOpacity style={styles.menuContainer} onPress={()=> navigation.openDrawer()}>
             <SimpleLineIcons style={styles.menu} name="menu" size={30} color="#fff"    />  
        </TouchableOpacity>
          
        <Text style={styles.HeaderText}>Préstamos J&J</Text>
            
    </LinearGradient>

 )


}

const styles= StyleSheet.create({
    Header:{
        position:'relative',
        top:wp('0%'),
        left:wp('-5%'),
        width:wp('102%'),
        height:wp('40%'),
        paddingVertical:hp('0%'),
        //marginHorizontal:wp('-5%'),
        backgroundColor:'#036082',
        borderBottomLeftRadius:wp('10%'),
        borderBottomRightRadius:wp('10%'),
        borderBottomWidth:hp('0.25%'),
        borderLeftWidth:wp('0.2%'),
        borderRightWidth:wp('0.2%'),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },

    HeaderText:{
        position:'relative',
        top:wp('7.5%'),
        left:wp('-15%'),
        width:wp('70%'),
        fontWeight:'bold',
        fontSize:wp('7%'),
        color:'#fff',
        letterSpacing:wp('0.1%'),
        textAlign:'center',
        justifyContent:'center',
        marginBottom:wp('5%')
    },

    menu:{
        position:'relative',
        top:wp('5%'),
      // marginLeft:wp('7%')
    },
    menuContainer:{
        width:wp('20%'),
        height:wp('30%'),
       // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:wp('4%')
    }
  
})