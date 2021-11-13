import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Easing}from 'react-native';

/*Home */
import home from '../screens/home';
import HomeHeader from '../component/HeaderComponets/HomeHeader';


/*Datos personales */
import DatosPersonales from '../screens/DatosPersonales/DatosPersonales';
import InfoDatosPersonales from '../screens/DatosPersonales/InfoDatosPersonales';
import InfoDatosPersonalesHeader from '../component/HeaderComponets/InfoDatosPersonalesHeader';
import InfoBuscarDatosPersonales from '../screens/DatosPersonales/InfoBuscarDatosPersonales';
import DatosPersonalesHeader from '../component/HeaderComponets/DatosPersonalesHeader';
import NotificacionView from '../screens/DatosPersonales/NotificationView';
import UpdateDatos from '../screens/DatosPersonales/UpdateDatos';

/* Registro de pagos */
import BuscarCliente from '../screens/RegistroDePagos/BuscarCliente';
import RegistroDePago from '../screens/RegistroDePagos/RegistroDePago';
import ListaDeClientes from '../screens/RegistroDePagos/ListaDeClientes';
import TodosLosPagos from '../screens/RegistroDePagos/TodosLosPagos';
import ListaDeClientesHeader from '../component/HeaderComponets/ListaDeClientesHeader';

/* Buscar Pagos  */
import ListaDePagos from '../screens/BuscarPagos/listaDePagos';
import ListaDePagosHeader from '../component/HeaderComponets/ListaDePagosHeader';
import BuscarPagos from '../screens/BuscarPagos/BuscarPagos';
import BuscarListaDePAgos from '../screens/BuscarPagos/BuscarListaDePagos';




const Stack = createStackNavigator();

export default function Navigation() {

  const config = {
    animation:'timing', 
     config:{
       duration:180,
       easing: Easing.linear 
     }
    }

     const CloseConfing ={
      animation:'timing', 
      config:{
        duration:200,
        easing: Easing.linear 
      }
    }
  

  /*const config = {
    animation: 'spring',
    config: {
      stiffness: 1600000,
      damping: 80000,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
    },
  };*/

  
  
    return( 
             
                
         <Stack.Navigator 
              screenOptions={{
                gestureEnabled: false, 
                gestureDirection: 'horizontal',
                cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
              transitionSpec:{
                    open: config,
                    close: CloseConfing
                }
              }}
                  headerMode='screen'
                  animation ='fade'
                
                >
              
                <Stack.Screen name='home' component={home} 
          
                  options={({navigation })=>({
                  headerTransparent:true,
                 
                  headerTitle: ()=> < HomeHeader navigation={navigation}/>,
                  
              /*     headerStyle:{
                 //  backgroundColor:'transparent',
                  // backgroundColor:'red',
                //  height:wp('15%'),
                   
                     

                  },*/

                })} />


                <Stack.Screen name='DatosPersonales' component={DatosPersonales} 
                    options={({navigation })=>({
                                      
                      headerStyle:{
                      backgroundColor:'#226D65',
                        height:70,
    
                    },
                    headerTitle: ()=> <DatosPersonalesHeader navigation={navigation} />,
                      headerTintColor:'#fff',
                 
    
                    })}
                />  
                 
                    <Stack.Screen name='UpdateDatos' component={UpdateDatos} 
                    options={({navigation })=>({
                                      
                      headerStyle:{
                      backgroundColor:'#226D65',
                        height:70,
    
                    },
                    headerTitle: ()=> <DatosPersonalesHeader navigation={navigation} />,
                      headerTintColor:'#fff',
                 
    
                    })}
                />       

                
                <Stack.Screen name='InfoDatosPersonales' component={InfoDatosPersonales} 
                      options={({navigation })=>({
                                      
                        headerStyle:{
                        backgroundColor:'#1e3c72',
                          height:70,
      
                      },
                      headerTitle: ()=> <InfoDatosPersonalesHeader navigation={navigation} />,
                        headerTintColor:'#fff',
                 
                      })} 
                />        

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
                                      marginRight:45

                                    }
                                  }}
                                    /> 

                  <Stack.Screen name='InfoBuscarDatosPersonales' component={InfoBuscarDatosPersonales} 
                                options={{
                                title:'',
                                headerTransparent:true,
                                  headerStyle:{
                                  backgroundColor:'#036082',
                                  height:80,
                                  
                                },
                                headerTintColor:'#fff',
                                headerTitleStyle:{
                                // fontSize:30,
                                  fontWeight:'bold',
                                // textAlign:'center',
                                  marginRight:500
                                  
                                }  
                                }}

                              />    


                    <Stack.Screen name='RegistroDePago' component={RegistroDePago} 
                            options={{
                              title:'Registro De Pago',
                              headerStyle:{
                                backgroundColor:'#611257',
                                height:70
                              },
                              headerTintColor:'#fff',

                              headerTitleStyle:{
                                fontSize:30, 
                                fontWeight:'bold',
                                textAlign:'center',
                                marginRight:45

                              }
                            }}
                            />      



                    <Stack.Screen name='BuscarCliente' component={BuscarCliente} 
                                options={{
                                title:'',
                                headerTransparent:true,
                                  headerStyle:{
                                  backgroundColor:'#036082',
                                  height:80,
                                  
                                },
                                headerTintColor:'#fff',
                                headerTitleStyle:{
                                // fontSize:30,
                                  fontWeight:'bold',
                                // textAlign:'center',
                                  marginRight:500
                                  
                                }  
                                }}

                              />    
             

                     <Stack.Screen name='ListaDeClientes' component={ListaDeClientes} 
                           options={({navigation })=>({
                                      
                            headerStyle:{
                            backgroundColor:'#1e3c72',
                              height:70,
          
                          },
                          headerTitle: ()=> <ListaDeClientesHeader navigation={navigation} />,
                            headerTintColor:'#fff',
                          /*    headerTitleStyle:{
                            fontSize:30,
                            fontWeight:'bold',
                            textAlign:'center',
                            marginRight:40
                            
                          },*/
          
                          })}   /> 

                         <Stack.Screen name='TodosLosPagos' component={TodosLosPagos} 
                            options={{
                              title:'Todos Los Pagos',
                              headerStyle:{
                                backgroundColor:'#812B1C',
                                height:70
                              },
                              headerTintColor:'#fff',

                              headerTitleStyle:{
                                fontSize:25, 
                                fontWeight:'bold',
                                textAlign:'center',
                                marginRight:45

                              }
                            }}
                            />   


                      <Stack.Screen name='ListaDePagos' component={ListaDePagos} 
                           options={({navigation })=>({
                                      
                            headerStyle:{
                            backgroundColor:'#BF7200',
                              height:70,
          
                          },
                          headerTitle: ()=> <ListaDePagosHeader navigation={navigation} />,
                            headerTintColor:'#fff',
                          /*    headerTitleStyle:{
                            fontSize:30,
                            fontWeight:'bold',
                            textAlign:'center',
                            marginRight:40
                            
                          },*/
          
                          })}   />


                           <Stack.Screen name='BuscarPagos' component={BuscarPagos} 
                                options={{
                                title:'',
                                headerTransparent:true,
                                  headerStyle:{
                                  backgroundColor:'#036082',
                                  height:80,
                                  
                                },
                                headerTintColor:'#fff',
                                headerTitleStyle:{
                                // fontSize:30,
                                  fontWeight:'bold',
                                // textAlign:'center',
                                  marginRight:500
                                  
                                }  
                                }}

                              />    

                               <Stack.Screen name='BuscarListaDePAgos' component={BuscarListaDePAgos} 
                                options={{
                                title:'',
                                headerTransparent:true,
                                  headerStyle:{
                                  backgroundColor:'#036082',
                                  height:80,
                                  
                                },
                                headerTintColor:'#fff',
                                headerTitleStyle:{
                                // fontSize:30,
                                  fontWeight:'bold',
                                // textAlign:'center',
                                  marginRight:500
                                  
                                }  
                                }}

                              />                


     
            </Stack.Navigator>     


         
              
           
    );
}


