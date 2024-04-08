import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Card from '../components/Card';
import Navigation from '../components/Navigation';



export default function HomeTab({navigation}){
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

                <View style = {styles.profile}>
                    <Text style = {styles.name}>Hi, Nazrin</Text>
                    <Text style = {styles.pp}>Your Plants are waiting for you</Text>
                </View>   
            </View>

            <ScrollView> 
                <View style = {styles.garden}>
                    <Text style = {styles.my}>My Garden</Text>
                    <Text style = {styles.number}>(3 plants)</Text>
                </View>

                <View style = {styles.but}>
                    <TouchableOpacity>
                        <View style = {styles.card} >
                            <Text style = {styles.cardtext}> Indoor </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style = {styles.card} >
                            <Text style = {styles.cardtext}> Outdoor </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style = {styles.card} >
                            <Text style = {styles.cardtext}> Both </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style = {styles.CardCarousel}>
                    <Card ></Card>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate('Plan')}}>
                    <View style = {styles.viewbox}> 
                        <Text style = {styles.plan}>View Plan</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

           {/* <View>
           <Navigation style = {styles.nav}></Navigation> 
           </View> */}

        </View>

    )
}



const styles = StyleSheet.create({
    nav:{
        postion: "absolute",
        
    },
    CardCarousel: {
        marginTop: 40
    },
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#E6DACE',
    },
    bg1:{
        width:'100%',
        height:'23%',
        backgroundColor:'#F4ECE6',
        borderRadius:30 
    },
    logo:{
        marginLeft:30,
        marginTop:50,
        marginRight:30 
    },
    logo1:{
        height:40,
        width:100
    },
    profile:{
        marginLeft:35,
        marginTop:30
    },
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:30,
    },
    pp:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
        paddingTop:4,
        color: "#95908d"
    },
    edit:{
        marginTop:75,
        height: 30,
        width: 110,
        borderRadius: 8,
        backgroundColor: "#A7C744",
        alignItems:"center",
        justifyContent:"center",
    },
    edit1:{
        fontFamily:"OwenPro-Medium",
        fontSize: 13
    },
    garden:{
        marginTop:10,
        marginLeft:35,
        flexDirection:"row"
    },
    my:{
        fontSize:22,
        fontFamily:"OwenPro-Medium"
    },
    number:{
        paddingLeft:4,
        paddingTop:5,
        fontSize:15,
        fontFamily:"OwenPro-Regular"
    },
    but:{
        alignItems: 'center',
        flexDirection:"row",
        marginLeft:20
    },
    card:{
        height: 34,
        width: 117,
        borderRadius: 20,
        backgroundColor: "#f4ece6",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:15
    },
    cardtext:{
        color:'black',
        fontFamily: "OwenPro-Regular",
        fontSize:15,
    },
    plants:{
        alignItems:"center",
        justifyContent:"center",
    },
    plant:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
    },
    viewbox:{
        height: 36,
        width: 150,
        borderRadius: 8,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        marginLeft:120,
        marginBottom:20,
    },
    plan:{
        fontSize:17,
        fontFamily:"OwenPro-Medium"
    },
    card1:{
        height: 100,
        width:330,
        borderRadius: 8,
        backgroundColor: "#f4ece6",
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.6
    },
    but1:{
        alignItems: 'center',
        flexDirection:"row",
        marginLeft:30,
        marginTop:10
    },
})