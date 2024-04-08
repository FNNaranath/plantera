import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';

export default function ProfileTab({navigation}){
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

    return(
        <View style = {styles.bg}>
            <View style = {styles.bg1}>
                <View style = {styles.logo}>
                    <Image style = {styles.logo1} source={require('../assets/pictures/logo.png')}/>
                </View>

                <View>
                    <View style = {styles.profile}>
                        <View style = {styles.circle}></View>
                        
                        <View style = {styles.profile1}>
                            <Text style = {styles.name}>Nazrin Naranath</Text>
                        </View>

                        <View style = {styles.details}>
                            <Text style = {styles.det}>Plant Mom</Text>
                            <Text style = {styles.det}>She/Her</Text>
                            <Text style = {styles.det}>hi@gmail.com</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View>
                    <Text>My Plants</Text>
                    <Text>6</Text>
                </View>

                <View>
                    <Text>Logout</Text>
                </View>
            </View>

            <View>
                <Navigation style = {styles.nav}></Navigation> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#E6DACE'
    },
    bg1:{
        width:'100%',
        height:'38%',
        backgroundColor:'#F4ECE6',
        
    },
    logo:{
        marginLeft:30,
        marginTop:50,  
    },
    logo1:{
        height:40,
        width:100
    },
    profile: {
        paddingTop:40,
        justifyContent:"center",
        alignItems:"center",
    },
    circle: {
        width:120,
        height:120,
        borderRadius:100,
        backgroundColor: "#FFFFFF",
    },
    name:{
        paddingTop: 15,
        fontFamily: "OwenPro-Medium",
        fontSize:17,
    },
    details:{
        flexDirection:"row",
    },
    det:{
        fontFamily: "OwenPro-Regular",
        fontSize:13,
        padding:5
    }
})