import React from 'react';
import{StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import{MaterialIcons} from '@expo/vector-icons';
import Navigation from '../../navigation/navigation';
import 'react-native-gesture-handler';


export default function VarracoSearch(props){
 
    const{navigation}=props;

 const GoTo = ()=>{

    navigation.navigate('BuscarVarraco')
    
 } 



 return(
    <View style={styles.Header}>
       
        <View>
            <Text style={styles.HeaderText}>Verraco</Text>
           
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
        fontWeight:'bold',
        fontSize:30,
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
        marginRight:50,
        
    },
    SeachButton:{
      position:'relative',
      right:16,
      marginLeft:20

    }
    

})