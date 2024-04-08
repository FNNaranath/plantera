import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Carousel from 'react-native-snap-carousel'
import { db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { RadioButton } from 'react-native-paper';

export let exportedSignup = ''

export default function Signup({navigation}){
    const [username, setName] = useState('')
    const [plarent, setPlarent] = useState('')
    const [email, setEmail] = useState('')

    exportedSignup = username
    function sendTodatabase() {
        setDoc(doc(db,'users',username),
        {
            username:username,
            plarent:plarent,
            email:email
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
            <View style = {styles.sign}>
                <Text style = {styles.sign1}>Sign Up</Text>
                <Text style = {styles.create}>Create your Account</Text>
            </View>
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.flex} keyboardVerticalOffset={230}> 
            <View style = {styles.login}>
                <Text style = {styles.user}>Username</Text>
                <TextInput style = {styles.input} value = {username} onChangeText={(username) => setName(username)}></TextInput>
                <Text style = {styles.user}>Which 'Plarent' are you?</Text>
            </View>
    
            <View style={styles.root}>
                <TouchableOpacity onPress={(plarent) => setPlarent('MOM')}>
                    <View style={[styles.card, { backgroundColor: plarent === 'MOM' ? "#A7C744" : "transparent" }]}>
                        <Text style={[styles.cardtext, { color: plarent === 'MOM' ? "#FFF" : "#000" }]}> MOM </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={(plarent) => setPlarent('DAD')}>
                    <View style={[styles.card, { backgroundColor: plarent === 'DAD' ? "#A7C744" : "transparent" }]}>
                        <Text style={[styles.cardtext, { color: plarent === 'DAD' ? "#FFF" : "#000" }]}> DAD </Text>
                    </View>
                </TouchableOpacity>
            </View>
        
            <View style = {styles.text}>
                <Text style = {styles.text1}>Email</Text>
                <TextInput style = {styles.input} value = {email} onChangeText={(email) => setEmail(email)}></TextInput>
                <Text style = {styles.text1}>Password</Text>
                <TextInput style = {styles.input} secureTextEntry></TextInput>
            </View>
            
            <TouchableOpacity style = {styles.op} onPress={()=>{navigation.navigate('FirstPlant') 
            sendTodatabase()}}>
            <View style = {styles.button}>
                <Text style = {styles.but1}>SIGN UP</Text>
            </View>
            </TouchableOpacity>

            <View style = {styles.reg}>
                <Text style = {styles.acc}>Already registered?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                    <Text style = {styles.acc1}>Login</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            
            </View>


     </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        marginTop:20
      },
    card: {
        height: 40,
        width: 120,
        borderRadius: 48,
        //backgroundColor: "#A7C744",
        borderColor:"#A7C744",
        borderWidth:1,
        marginRight: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:50,
      },
    cardtext:{
        color:'black',
        fontFamily: "OwenPro-Medium",
        fontSize:15,
    },
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
        marginLeft:20,
        marginTop:45
    },
    logo1:{
        height:40,
        width:100
    },
    sign:{
        marginLeft:30,
        marginTop:60,
        //marginBottom:40
        flex:0.35
    },
    sign1:{
        fontSize:35,
        fontFamily: "OwenPro-Medium",
        paddingBottom:5
    },
    create:{
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    login:{
        marginLeft:30, 
    },
    user:{
        paddingTop:10,
        fontFamily: "OwenPro-Regular",
        fontSize:17,
    },
    input:{
        width:320,
        borderBottomWidth:1,
        fontFamily: "OwenPro-Regular",
        fontSize:17,
        paddingTop: 10
    },
    but:{
        fontSize:20,
        color:'white'
    },
    text:{
        marginLeft:30,
        fontFamily: "OwenPro-Regular",
        fontSize:17,
    },
    text1:{
        width:320,
        borderBottomWidth:1,
        paddingTop:20,
        fontFamily: "OwenPro-Regular",
        fontSize:17
    },
    button:{
        marginLeft:30,
        marginTop:20,
        marginBottom:5,
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
    but1:{
        color:'white',
        fontFamily: "OwenPro-Regular",
        fontSize:20
    },
    reg:{
        marginLeft:35,
        flexDirection:'row',
    },
    acc:{
        paddingLeft:70,
        paddingRight:8,
        fontFamily: "OwenPro-Regular",
        fontSize:15
    },
    acc1:{
        fontFamily: "OwenPro-Medium",
        fontSize:15
    },
})