import React from 'react';
import{StyleSheet, Text, View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navigation from '../../navigation/navigation';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function DatosPersonalesHeader(props){
 
    const{navigation}=props;

 const GoTo = ()=>{
   navigation.navigate('NotificacionView');
    
 } 



 return(
    <View style={styles.Header}>
       
        <View>
            <Text style={styles.HeaderText}>Datos Personales</Text>
           
        </View>
        
        <View >
           <Ionicons name="md-notifications-sharp" size={40} color="#fff"  onPress={()=> GoTo()} style={styles.SeachButton} />
        </View>

    </View>

 )


}

const styles= StyleSheet.create({

    Header:{
        width:wp('100%'),
        height:wp('100%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:wp('-5%')
       

    },
    HeaderText:{
        fontWeight:'bold',
        fontSize:wp('6.5%'),
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
        
    },
    SeachButton:{
      position:'relative',
      left:wp('-20%'),
      marginLeft:wp('5%')

    }
    

})