import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {View} from 'react-native';
import Navigation from './navigation';
import DrawerNavigator from './DrawerNavigation';

export default function After(){
    return(
       
            <NavigationContainer>  
                 <DrawerNavigator/>
            </NavigationContainer>       
    )

}