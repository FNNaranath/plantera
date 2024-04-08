import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';

export default function Settings({navigation}){
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

            <View style = {styles.container}>
                <View style = {styles.statistics}>
                    <View style = {styles.stat}>
                        <Text style = {styles.followers}>5</Text>
                        <Text style = {styles.foltext}>Followers</Text> 
                    </View>
                    
                    <View style = {styles.stat}>
                        <Text style = {styles.following}>5</Text> 
                        <Text style = {styles.foltext}>Following</Text>
                    </View>
                </View>

                <View style = {styles.box}>
                    <View style = {styles.myplants}>
                        <Text style = {styles.myplants1}>My Plants</Text>
                        <Text style = {styles.number}>3</Text>
                    </View>

                    <View style = {styles.myplantnames}>
                        <Text style = {styles.planttext}>Plunni, bamboo plant</Text>
                        <Text style = {styles.planttext}>Blunni, money plant</Text>
                        <Text style = {styles.planttext}>Alpha, cactus plant</Text>
                    </View>  
                </View>

                <View style = {styles.logout}>
                    <Text style = {styles.logouttext} onPress={()=> {navigation.navigate('Login')}}>Logout</Text>
                </View>
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
        height:'40%',
        borderRadius:30,
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
    profile1:{
        paddingTop: 7,
    },
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:17,
    },
    details:{
        flexDirection:"row",
    },
    det:{
        fontFamily: "OwenPro-Regular",
        fontSize:12,
        padding:5
    },
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    statistics:{
        flexDirection:"row",
        paddingBottom:20,
        paddingTop:20,
    },
    stat:{
        alignItems:"center",
        paddingRight:10,
        justifyContent:"center"
    },
    followers:{
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    following:{
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    foltext:{
        fontFamily: "OwenPro-Regular",
        fontSize:14,
    },
    box:{
        height:130,
        width:300,
        borderRadius:20,
        backgroundColor:"#F4ECE6",
        flexDirection:"row",
    },
    myplants:{
        // justifyContent:"center",
        alignItems:"center",
        paddingRight:35,
        paddingTop:10,
        paddingLeft:30,
    },
    myplants1:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
    },
    number:{
        fontFamily: "OwenPro-Regular",
        fontSize:40,
        paddingTop:20
    },
    myplantnames:{
        paddingTop:30,
        paddingBottom:10,
        justifyContent:"space-evenly"
    },
    planttext:{
        fontFamily: "OwenPro-Regular",
        fontSize:14,
    },
    logout:{
        paddingTop:20,
    },
    logouttext:{
        fontFamily: "OwenPro-Regular",
        fontSize:14,
    }
})