import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, Pressable, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';
import { exportedUserPlan } from './ChangePlan';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window')


export default function OthersPlan({navigation}){
    
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
    console.log(exportedUserPlan)
    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }
return(
    <View style ={styles.bg}>
            <View style = {styles.bg1}>
                <Image style = {styles.plant} source={require('../assets/pictures/bambooPlant.jpg')}/>
            </View>

            <View style = {styles.infor}>
                <Text style = {styles.nickname}>plantname</Text>
                    <TouchableOpacity style = {styles.flex}>
                    <Text style = {styles.plantname}>nickname</Text>
                    <Image style = {styles.edit} source={require('../assets/icons/edit.png')} />
                    </TouchableOpacity>
            </View>

            <View style = {styles.namecont}>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/sun.png')}/></View>
                    <View>
                         <Text style = {styles.need}>Light</Text>
                         <Text>bright</Text>
                    </View>
                </View>
                <View style = {styles.need1}> 
                    <View><Image style = {styles.icon1} source={require('../assets/icons/water.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Water Intake</Text>
                        <Text>50 ml</Text>
                    </View>
                </View>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/shovel.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Pot</Text>
                        <Text>bnalab</Text>
                    </View>
                </View>
                <View style = {styles.need1}>
                    <View><Image style = {styles.icon1} source={require('../assets/icons/temp.png')}/></View>
                    <View>
                        <Text style = {styles.need}>Temperature</Text>
                        <Text>30° Celsius</Text>
                    </View>
                </View>
            </View>

            <View style = {styles.box} >
                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                    <View style = {styles.viewcont}>
                        <Text style = {styles.view}>Use {exportedUserPlan}'s plan</Text> 
                    </View> 
                </TouchableOpacity>
            </View>
        </View>
)
}

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
        height: 40,
        width: 150,
        borderRadius: 10,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop:31,
        alignItems:'center'
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