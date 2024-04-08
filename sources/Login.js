import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Platform, Pressable, KeyboardAvoidingView} from 'react-native';
import {useFonts} from 'expo-font';
import Checkbox from 'expo-checkbox'
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from './Navigation';
import { db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

export let exportedUsername = ''

export default function Login({navigation}) {

    const [isChecked,setChecked] = useState(false);
    const [username, setName] = useState('')
    exportedUsername = username

    function sendTodatabase(){
        setDoc(doc(db,'users',username),
        {
            username:username
        })
    }

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
           <View style = {styles.logo}>
                <Image style = {styles.logo1} source={require('../assets/pictures/logo.png')}/>
           </View>
           <View style={styles.container}>
           <View style = {styles.hello}>
                <Text style = {styles.hel}>Hello</Text>
                <Text style = {styles.sub}>Let's Grow a Plant</Text>
           </View>

           <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.flex} keyboardVerticalOffset={230}> 
           
           <View style = {styles.login}>
                <Text style = {styles.user}>Username</Text>
                <TextInput style = {styles.input} value = {username} onChangeText={(username) => setName(username)}></TextInput>
                <Text style = {styles.user}>Password</Text>
                <TextInput style = {styles.input} secureTextEntry></TextInput>
           </View>

           <View style = {styles.cont}>
           <Checkbox style = {styles.box} color={isChecked? "#a7c744": undefined} value={isChecked} onValueChange={setChecked}/>
            {/* <View style = {styles.box}></View> */}
                <Text style = {styles.rem}>Remember me</Text>
                <StatusBar style="auto"/>
                <Text style = {styles.for}>Forgot Password?</Text>
           </View>

           <TouchableOpacity style = {styles.op} onPress={()=> {navigation.navigate('Navigation')
           sendTodatabase()}}>
           <View style = {styles.button}>   
                <Text style = {styles.but}>LOGIN</Text>
           </View>
           </TouchableOpacity>
          

           <View style = {styles.bot}>
                <Text style = {styles.acc}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=> {navigation.navigate('Signup')}}>
                        <Text style = {styles.sign}>Sign Up</Text>
                    </TouchableOpacity>
           </View> 
           </KeyboardAvoidingView>
           </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F4ECE6',
        //flex:1,
    },
    container: {
        flex: 1,  // Allow space for both the texts and the login section
    },
    flex:{
        flex:1,
    },
    logo:{
        marginLeft:30,
        marginTop:45,
        //flex:0.1,
    },
    logo1:{
        height:40,
        width:100
    },
    hello:{
        marginLeft:30,
        marginTop:60,
        //marginBottom:20,
        // flex:0.5
        flex: 0.45,  // Set a fixed height for the top text section (adjust as needed)
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    hel:{
        fontSize:35,
        fontFamily: "OwenPro-Medium",
        paddingBottom:5
    },
    sub:{
        fontSize:20,
        fontFamily: "OwenPro-Regular",
    },
    login:{
        marginLeft:30, 
    },
    user: {
        paddingTop:10,
        fontFamily: "OwenPro-Regular",
        fontSize:17
    },
    input:{
        width:320,
        paddingTop:10,
        borderBottomWidth:1,
        fontFamily: "OwenPro-Regular",
        fontSize:17
    },
    cont:{
        flexDirection:'row',
        marginLeft:30,
        marginTop:15,
    },
    box:{
        width:18,
        height:18,
        borderWidth:1,
        borderColor:'black',
    },
    rem:{
        paddingLeft:8,
        paddingRight:75,
        fontFamily: "OwenPro-Regular",
        fontSize:15
    },
    for:{
        fontFamily: "OwenPro-Regular",
        fontSize:15
    },
    button:{
        marginTop:50,
        marginBottom:5,
        marginLeft:30,
        justifyContent:'center',
        alignItems:'center',
        width:322,
        height:60,
        backgroundColor:"#a7c744",
        borderRadius:10,
        shadowColor:'#171717',
        shadowOpacity:0.1,
        shadowRadius:1,
        shadowOffset:{ width: -1, height: 2 },
    },
    but:{
        fontSize:20,
        color:'white',
        fontFamily: "OwenPro-Regular",
    },
    op:{

    },
    bot:{
        marginLeft:45,
        flexDirection:'row',
    },
    acc:{
        paddingLeft:35,
        paddingRight:8,
        fontFamily: "OwenPro-Regular",
        fontSize:15
    },
    sign:{
        fontFamily: "OwenPro-Medium",
        fontSize:15

    }
})