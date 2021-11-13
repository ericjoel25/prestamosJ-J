import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/*Home */


/*Datos personales */

import NotificacionView from '../screens/DatosPersonales/NotificationView';





const Stack = createStackNavigator();

export default function NotificacionStack() {

  
  
    return( 
             
                
         <Stack.Navigator>
              
                    <Stack.Screen name='NotificacionView' component={NotificacionView} 
                                  options={{
                                    title:'Notification',
                                    headerStyle:{
                                      backgroundColor:'#611257',
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


