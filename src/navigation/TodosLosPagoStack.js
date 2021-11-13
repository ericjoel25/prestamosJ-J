import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/*Home */


/*Datos personales */
import TodosLosPagos from '../screens/RegistroDePagos/TodosLosPagos';





const Stack = createStackNavigator();

export default function TodosLosPagoStack() {
  
  
    return( 
             
                
         <Stack.Navigator>
              
                    <Stack.Screen name='TodosLosPagos' component={TodosLosPagos} 
                                  options={{
                                    title:'Todos Los Pagos',
                                    headerStyle:{
                                      backgroundColor:'#812B1C',
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


