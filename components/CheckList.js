import React from 'react';
import Checkbox from 'expo-checkbox'
import { View, Text, StyleSheet, Pressable} from "react-native"
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 


export default function CheckList(props) {
    let [fontsLoaded] = useFonts({
        "OwenPro-Bold": require("../assets/fonts/OwenPro-Bold.otf"),
        "OwenPro-SemiBold": require("../assets/fonts/OwenPro-SemiBold.otf"),
        "OwenPro-Regular": require("../assets/fonts/OwenPro-Regular.otf"),
        "OwenPro-Medium": require("../assets/fonts/OwenPro-Medium.otf"),
        "OwenPro-Heavy": require("../assets/fonts/OwenPro-Heavy.otf"),
    });

    //Displays splashscreen till the fonts loaded
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }
console.log("isSelected:", props.data.isSelected);
console.log("CheckList props:", props);

return (
    <Pressable style={styles.view} onLongPress={() => props.deleteItem(props.index)}>
        <Checkbox style={styles.checkbox} value={props.data.isSelected} color='black' onValueChange={(value) => props.setIsSelected(props.index, value)} />
        <Text style={{ ...styles.text, textDecorationLine: props.data.isSelected ? "line-through" : "none" }}>{props.data.text}</Text>
    </Pressable>
);
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height:55,
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4ECE6',
        marginBottom: 15,
        paddingLeft:12
    },
    text: {
        color: 'black',
        fontFamily:'OwenPro-Regular'
    },
    checkbox: {
        marginRight: 15,
        // color:'#A7C744'
    }
})

