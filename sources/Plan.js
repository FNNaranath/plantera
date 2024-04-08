import {View, Text, Image, TextInput, StyleSheet, ActivityIndicator, ScrollView, FlatList, Dimensions, TouchableOpacity, Pressable} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';
import { getDoc,doc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { exportedUsername } from './Login';
import { exportedPlantName } from './Home';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window')

const sliderWidth = ScreenWidth

export default function Plan({navigation}){
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
    const [isLoading, setLoading] = useState(true);
    const [planValue, setPlan] = useState(null);
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const docPlan = await getDoc(doc(db, 'users', exportedUsername, 'Plants', exportedPlantName))
                let plan = []
                plan = docPlan.data()
                //console.log(plan)
                setPlan(plan)
                setLoading(false); // Set loading to false after data fetch

            } 
            catch (error) {
                console.log('Error fetching data', error);
            }
            console.log(planValue)
        };
      

        fetchData();
        if (!isLoading) {
            const intervalID = setInterval(fetchData, 1000);
            return () => clearInterval(intervalID);
        }
    }, [isLoading]);

    if (!fontsLoaded || isLoading) {
        // Return loading symbol or any UI that indicates loading
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    } else {
        SplashScreen.hideAsync();
    }


    return(
        <View style ={styles.bg}>
            <View style = {styles.bg1}>
                <Image style = {styles.plant} source={require('../assets/pictures/bambooPlant.jpg')}/>
            </View>

            <View style = {styles.infor}>
                <Text style = {styles.nickname}>{planValue.Name}</Text>
                <TouchableOpacity style = {styles.flex}>
                    <Text style = {styles.plantname}>{planValue.Nickname}</Text>
                    <Image style = {styles.edit} source={require('../assets/icons/edit.png')} />
                </TouchableOpacity>
            </View>

            <View style = {styles.namecont}>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/sun.png')}/></View>
                    <View>
                         <Text style = {styles.need}>Light</Text>
                         <Text>{planValue.Light}</Text>
                    </View>
                </View>
                <View style = {styles.need1}> 
                    <View><Image style = {styles.icon1} source={require('../assets/icons/water.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Water Intake</Text>
                        <Text>{planValue.Water} ml</Text>
                    </View>
                </View>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/shovel.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Pot</Text>
                        <Text>{planValue.Pot}</Text>
                    </View>
                </View>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/temp.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Temperature</Text>
                        <Text>{planValue.Temperature}° Celsius</Text>
                    </View>
                </View>
            </View>

            <View style = {styles.box} >
                <TouchableOpacity onPress={()=>{navigation.navigate('Camera')}}>
                    <View style = {styles.viewcont}>
                        <Text style = {styles.view}>Check Health</Text> 
                    </View> 
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{navigation.navigate('NewUser')}}>
                    <View style = {styles.viewcont}>
                        <Text style = {styles.view}>Change Plan</Text> 
                    </View> 
                </TouchableOpacity>
            </View>
        </View>
    )}

const styles = StyleSheet.create({
    profilecont:{
        //marginLeft:30,
        marginTop:120,
    },
    flex:{
        flexDirection:'row'
    },
    edit:{
        height:12,
        width:12,
        marginLeft:8,
        marginTop:2
    },
    loadingContainer:{
        alignItems:"center",
        justifyContent:"center",
        width:ScreenWidth,
        height:ScreenHeight,
        backgroundColor:'#E6DACE'
    },
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
    namecont:{
        padding:10,
    },
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:15,
    },
    need:{
        fontFamily: "OwenPro-Medium",
        fontSize:15,
    },
    need1:{
        padding:10,
        marginBottom:15,
        backgroundColor:"#F4ECE6",
        marginLeft:15,
        marginRight:15,
        borderRadius:8,
        flexDirection:'row'
    },
    icon1:{
        marginRight:10,
        height:23,
        width:23,
    },
    viewcont:{
        height: 34,
        width: 117,
        borderRadius: 10,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:30,
    },
    view:{
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
    box:{
        flexDirection:'row',
        marginTop:31,
        marginLeft:63
    },
    plant:{
        marginLeft:98,
        marginTop:70,
        height: 200,
        width: 200,
        borderRadius: 25,
        backgroundColor: "black",
    },
    icon:{
        height:35,
        width:35,
        marginTop:15,
        marginLeft:10
    },
})