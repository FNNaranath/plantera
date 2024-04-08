import * as React from 'react'
import Home from './Home'
import Reminder from './Reminder';
import CameraButton from './CameraButton'
import ChangePlan from './ChangePlan'
import Profile from './Settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Community from './Community';
import { Ionicons } from '@expo/vector-icons';
import Settings from './Settings';


const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <Tab.Navigator
        initialRouteName = "Home"
        screenOptions = {({route}) => ({
            tabBarStyle: ({
                backgroundColor: "#F4ECE6"
            }),
            tabBarActiveTintColor: "#A7C744",
            tabBarInactiveTintColor:"grey",
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if(rn === "Home"){
                    iconName = focused ? 'home' : 'home-outline'
                } 
                else if (rn === "Reminder"){
                    iconName = focused ? 'calendar' : 'calendar-outline'
                }
                else if (rn === "Add"){
                    iconName = focused ? 'add-circle' : 'add-circle-outline'
                }
                else if(rn === "Community"){
                    iconName = focused ? 'people' : 'people-outline'
                }
                else if(rn === "Settings"){
                    iconName = focused ? 'settings' : 'settings-outline' 
                }
                return(<Ionicons name={iconName} size={size} color = {color}></Ionicons>)
            }
            
            
        })}>
        <Tab.Screen
        name = "Home"
        component = {Home}
        options={{headerShown: false}}></Tab.Screen>
        <Tab.Screen
        name = "Reminder"
        component = {Reminder}
        options={{headerShown: false}}></Tab.Screen>
        <Tab.Screen
        name = "Add"
        component = {CameraButton}
        options={{headerShown: false}}></Tab.Screen>
        <Tab.Screen
        name = "Community"
        component = {Community}
        options={{headerShown: false}}></Tab.Screen>
        <Tab.Screen
        name = "Settings"
        component = {Settings}
        options={{headerShown: false}}></Tab.Screen>

        </Tab.Navigator>
    )
}