import {View, Text, Image, TextInput, StyleSheet, Platform, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Dimensions, FlatList} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window')

export default function NewUser({navigation}){
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
   
const [showInput, setShowInput] = useState(false);

    return(
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
            <ScrollView contentContainerStyle={styles.scrollView}>

            <View style ={styles.bg}>
            <View style = {styles.bg1}>
                <Image style = {styles.plant} source={require('../assets/pictures/bambooPlant.jpg')}/>
            </View>

            <View style = {styles.infor}>
                <Text style = {styles.nickname}>Aloevera</Text>
                <TouchableOpacity style = {styles.flex}>
                    <TextInput style = {styles.plantname} placeholder='Write a nickname for you plant'/>
                    <Image style = {styles.edit} source={require('../assets/icons/edit.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.namecont}>
        {showInput ? (
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>How much sunlight is needed?</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter sunlight details..."
                />
                <Text style={styles.inputLabel}>Water Intake (ml):</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter water intake details..."
                />
                <Text style={styles.inputLabel}>How often to repot your plant?</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter pot details..."
                />
                <Text style={styles.inputLabel}>Temperature (°Celsius):</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter temperature details..."
                />
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowInput(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={()=> {navigation.navigate('Navigation')}}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                </View>
            </View>
        ) : (
          <TouchableOpacity style={styles.box} onPress={() => setShowInput(true)}>
            <Image style={styles.edit1} source={require('../assets/icons/writing.png')} />
            <Text style={styles.text}>Make your own plan</Text>
          </TouchableOpacity>
        )}

                <View style={{ marginTop: 35, flexDirection: 'row', alignItems: 'center', marginBottom:35 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', fontSize: 16, fontFamily:'OwenPro-SemiBold' }}>or</Text>
                        </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>

                <TouchableOpacity style = {styles.box} onPress={()=> {navigation.navigate('ChangePlan')}}>
                    <Image style = {styles.edit1} source={require('../assets/icons/internet.png')}/>
                    <Text style = {styles.text}>Find a pre-made plan</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

    )}

const styles = StyleSheet.create({
    nickname:{
        fontFamily: "OwenPro-Medium",
        fontSize:29,
        marginLeft:30,
    },
    plantname:{
        fontFamily: "OwenPro-Regular",
        paddingBottom:10,
        marginLeft:30,
    },
    edit:{
        height:12,
        width:12,
        marginLeft:8,
        marginTop:2
    },
    edit1:{
        height:32,
        width:32,
    },
    flex:{
        flexDirection:'row'
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    namecont:{
        justifyContent:'center',
        alignItems:'center',
        //padding:30,
        paddingTop:20,
    },
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:15,
    },
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#E6DACE'
    },
    bg1:{
        width:'100%',
        height:'22%',
        backgroundColor:'#F4ECE6',
        borderRadius:30,
    },
    infor:{
        paddingTop:100,
    },
    plant:{
        marginLeft:98,
        marginTop:70,
        height: 200,
        width: 200,
        borderRadius: 25,
        backgroundColor: "black",
    },
    box:{
        height: 84,
        width: 177,
        borderRadius: 10,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontFamily:'OwenPro-Medium'
    },
    submitButton: {
        //backgroundColor: '#A7C744',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    submitButtonText: {
    fontFamily: 'OwenPro-Medium',
    },
    inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height:240,
    width:250,
    backgroundColor: '#F4ECE6',
    borderRadius:20,
    // borderRadius: 10,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    //marginBottom: 20,
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
    },
    cancelButtonText:{
        color:'red',
        fontFamily: 'OwenPro-Medium',

    },
    cancelButton:{
        marginLeft:20
    },
    inputLabel:{
        fontFamily: 'OwenPro-Medium',
        paddingTop:7,
    },
    input:{
        fontFamily: 'OwenPro-Regular',


    },

      
   
})