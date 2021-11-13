import React from 'react';
import{StyleSheet, Text, View} from 'react-native';
import{MaterialIcons} from '@expo/vector-icons';
import 'react-native-gesture-handler';


export default function ListaDePagosHeader(props){
 
  const{navigation}=props;

const GoTo = ()=>{

    navigation.navigate('BuscarListaDePAgos')

} 



 return(
    <View style={styles.Header}>
       
        <View>
            <Text style={styles.HeaderText}>Lista De Pagos</Text>
        </View>
        
        <View >
           <MaterialIcons name='search' color='#fff' size={40} onPress={()=> GoTo()} style={styles.SeachButton} />
        </View>

    </View>

 )


}

const styles= StyleSheet.create({

    Header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:25,
        justifyContent:'center',
       

    },
    HeaderText:{
        position:'relative',
        right:55,
        fontWeight:'bold',
        fontSize:25,
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
        
    },
    SeachButton:{
      position:'relative',
      right:18,
      
    }
    

})