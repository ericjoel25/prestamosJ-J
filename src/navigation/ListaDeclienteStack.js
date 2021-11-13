import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/*Home */


/*Datos personales */
import ListaDeClientes from '../screens/RegistroDePagos/ListaDeClientes';





const Stack = createStackNavigator();

export default function TodosLosPagoStack() {
  
  
    return( 
             
                
         <Stack.Navigator>
              
                    <Stack.Screen name='ListaDeClientes' component={ListaDeClientes} 
                                  options={{
                                    title:'Lista De Clientes',
                                    headerStyle:{
                                      backgroundColor:'#1e3c72',
                                      height:70
                                    },
                                    headerTintColor:'#fff',

                                    headerTitleStyle:{
                                      fontSize:30, 
                                      fontWeight:'bold',
                                      textAlign:'center',
                                      

                                    }
                                  }}
                                    /> 

     
            </Stack.Navigator>     


         
              
           
    );
}


