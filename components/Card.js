import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 



export default function Card(){
    //Displays splashscreen till the fonts loaded
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
        <View style = {styles.root}>

          <View style={styles.box} >
            <Image style = {styles.plant} source={require('../assets/pictures/moneyPlant.png')}/>
            
            <View style = {styles.nameContainer}>
              <Text style = {styles.name} >Money Plant</Text>
              <Text style = {styles.nickname}>Plunni</Text>
            </View>

            <View style = {styles.icon}> 
              <Image style = {styles.icon1} source={require('../assets/icons/sun.png')}/>
              <Image style = {styles.icon1} source={require('../assets/icons/temp.png')}/>
              <Image style = {styles.icon1} source={require('../assets/icons/water.png')}/>
              <Image style = {styles.icon1} source={require('../assets/icons/shovel.png')}/>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
      fontFamily: "OwenPro-Medium",
      fontSize:20,
    },
    nickname:{
      fontFamily: "OwenPro-Regular",
      fontSize:15,
    },
    nameContainer: {
      marginTop: 10,
      alignItems:'center',
    },
    root: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:100
    },
    plant: {
      height: 210,
      width: 200,
      borderRadius: 25,
      backgroundColor: "black",
      marginTop: -100,
      marginLeft: 12
    },
    box: {
      height: 220,
      width: 225,
      borderRadius: 20,
      backgroundColor: '#F3EDE6',
    },
    icon:{
      marginLeft:30,
      marginTop:15,
      marginRight:30,
      flexDirection:"row",
      justifyContent:"space-between",
    },
    icon1:{
      height:23,
      width:23,
    }
})