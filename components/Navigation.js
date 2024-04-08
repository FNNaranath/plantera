import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Card from '../components/Card';
import Navigation from '../components/Navigation';


export default function Home({navigation}){
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



    return (
        <View style={styles.root}>
            <View style={styles.iconContainer}>
                <View style={styles.home}>
                    <Image style={styles.home1}
                    source={require('../assets/icons/home.png')} />
                </View>

                <View style={styles.home}>
                    <Image style={styles.home1}
                    source={require('../assets/icons/calendar.png')}/>
                </View>

                <View style={styles.add}>
                    <Image style={styles.add1}
                    source={require('../assets/icons/add.png')}/>
                </View>

                <View style={styles.home}>
                    <Image style={styles.home1}
                    source={require('../assets/icons/users1.png')}/>
                </View>

                <View style={styles.home}>
                    <Image style={styles.home1}
                    source={require('../assets/icons/user.png')}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: 347,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F4ECE6",
        marginLeft:20
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingTop:10,
        marginLeft: 20,
        marginRight:20
    },
    home1: {
        marginTop: 8,
        height: 19,
        width: 19,
            // shadowColor: '#171717',
            // shadowOpacity: 0.2,
            // elevation: 6,
            // shadowRadius: 3,
            // shadowOffset: { height: 4 },
    },
    add:{

    },
    add1:{    
        height: 30,
        width: 30,
    }
})