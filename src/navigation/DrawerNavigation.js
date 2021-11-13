import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import navigation from './navigation';
import Menu from '../component/HeaderComponets/Menu'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListaDeClientes from '../navigation/ListaDeclienteStack';
import TodosLosPagos from '../navigation/TodosLosPagoStack';
import NotificacionStack from '../navigation/NotificationStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
   
      <Drawer.Navigator 
          drawerStyle={{
            backgroundColor: '#09B6AE',
            width:wp('60%'),
           // height:hp('100%'),
            borderBottomRightRadius:wp('3%'),
            borderTopRightRadius:wp('3%')
           
            
            }}

            drawerContent={(props)=> <Menu {...props} />}

      >
             <Drawer.Screen name="Home" component={navigation}  />
             <Drawer.Screen name="ListaDeClientes" component={ListaDeClientes} />
             <Drawer.Screen name="TodosLosPagos" component={TodosLosPagos} />
             <Drawer.Screen name="NotificationView" component={NotificacionStack} />

      </Drawer.Navigator>
  
  );
}