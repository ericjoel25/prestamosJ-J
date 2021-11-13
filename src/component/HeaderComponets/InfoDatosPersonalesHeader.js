import React from 'react';
import{StyleSheet, Text, View} from 'react-native';
import{MaterialIcons} from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export default function InfoDatosPersonalesHeader(props){
 
  const{navigation}=props;


const GoTo = ()=>{

    navigation.navigate('InfoBuscarDatosPersonales')

    
} 



 return(
    <View style={styles.Header}>
       
        <View>
            <Text style={styles.HeaderText}>Datos Personales</Text>
        </View>
        
        <View >
           <MaterialIcons name='search' color='#fff' size={40} onPress={()=> GoTo()} style={styles.SeachButton} />
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
        marginHorizontal:wp('-20%')
    },
    HeaderText:{
        position:'relative',
        left:wp('15%'),
        fontWeight:'bold',
        fontSize:wp('6.5%'),
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
        
    },
    SeachButton:{
      position:'relative',
      left:wp('-6%'),
      
    }
    

})