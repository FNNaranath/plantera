import {View, Text, Image, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Navigation from '../components/Navigation';
import { db } from '../firebaseConfig';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { exportedPlantName } from './Home';

const {width: ScreenWidth} = Dimensions.get('window')
const sliderWidth = ScreenWidth

export let exportedUserPlan = ''

export default function ChangePlan({navigation}){
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

    const [bamboo, setBamboo] = useState('')    

    useState(()=>{
        const fetchData = async() => {
            try{
                const docBamboo = await getDocs(collection(db, '/bamboo'))
                let bamboo = []
                
                docBamboo.forEach((doc) => {
                    bamboo.push({
                        ...doc.data(),
                        id:doc.id
                    }
                    );
                });

                setBamboo(bamboo);
                
                     } catch(error){
                console.log('Error fetching data',error);
            }
            };
            fetchData();
            const intervalID = setInterval(fetchData,1000);

            return() => clearInterval(intervalID)
        }, [])
    
        const renderBamboo = ({ item }) => {
            return(
                <View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('OthersPlan'); exportedUserPlan=item.Name}}>
                        <View style = {styles.profilecont}>
                            <View style = {styles.circle}></View>

                            <View style = {styles.namecont} >
                                <Text style = {styles.name}>{item.Name}</Text>
                                <Text style = {styles.plarent}>{item.Plarent}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }





    return(
        <View style = {styles.bg}> 
            <View style = {styles.bg1}>
                <View style = {styles.plan}> 
                    <Text style = {styles.plan1}>Find a Plan</Text>
                    <View style = {styles.searchbaritems}>
                        <Image style = {styles.searchicon} source={require('../assets/icons/search.png')}/>
                        <TextInput style = {styles.searchtext} placeholder='Search'></TextInput>
                    </View>
                </View>
            </View>

            <View style ={styles.plans}>

                <View style = {styles.find}>
                    <Text style = {styles.find1}>{exportedPlantName}</Text>
                </View>

                <FlatList 
                renderItem = {renderBamboo}
                data = {bamboo}
                ref={(scrollView) => { this.scrollView = scrollView; }}
                style = {styles.scroll}>

                </FlatList>
                    {/* <TouchableOpacity onPress={()=>{navigation.navigate('OthersPlan')}}>
                        <View style = {styles.profilecont}>
                            <View style = {styles.circle}></View>

                            <View style = {styles.namecont} >
                                <Text style = {styles.name}>USER 1</Text>
                                <Text style = {styles.plarent}>Plant Dad</Text>
                                
                            </View>
                        </View>
                    </TouchableOpacity> */}

                    {/* <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 2</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                            
                        </View>
                    </View>

                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 3</Text>
                            <Text style = {styles.plarent}>Plant Dad</Text>
                        </View>
                    </View>

                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 4</Text>
                            <Text style = {styles.plarent}>Plant Dad</Text>
                        </View>
                    </View>
                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 5</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                            
                        </View>
                    </View>
                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 6</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                        </View>
                    </View>
                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 7</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                        </View>
                    </View>
                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 8</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                        </View>
                    </View>
                    <View style = {styles.profilecont}>
                        <View style = {styles.circle}></View>

                        <View style = {styles.namecont}>
                            <Text style = {styles.name}>USER 9</Text>
                            <Text style = {styles.plarent}>Plant Mom</Text>
                        </View>
                    </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav:{
        postion: "absolute",
    },
    searchbaritems:{
        flexDirection:"row",
        //justifyContent:"center",
        alignItems:'center', 
        paddingTop:20,
    },
    searchicon:{
        height:15,
        width:15,
        //marginLeft:10,
        marginRight:9,     
    },
    searchtext:{
        fontSize:17
    },
    circle:{
        height:52,
        width:52,
        backgroundColor:"white",
        borderRadius:40
    },
    profilecont:{
        flexDirection:"row",
        marginLeft:10,
        marginTop:20,
        padding:1,
        backgroundColor:'#F4ECE6',
        width: 365,
        borderRadius: 9,
        paddingVertical: 7,
        paddingLeft: 6
        

    },
    namecont:{
        marginLeft:10,
        justifyContent:'center',
        
    },
    name:{
        fontFamily: "OwenPro-Medium",
        fontSize:16,
    },
    plarent:{
        fontFamily: "OwenPro-Regular",
        fontSize:14,
    },
    viewcont:{
        height: 34,
        width: 117,
        borderRadius: 10,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:31,
        marginLeft:10
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
        height:'19%',
        backgroundColor:'#F4ECE6',
        borderRadius:30,
    },
    plan: {
        marginTop:60,
        marginLeft:35,
    },
    plan1:{
        fontFamily: "OwenPro-Medium",
        fontSize:35,
    },
    plan2:{
        paddingTop:4,
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    plan3:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
        paddingTop:8.5,
        paddingLeft:4,
        opacity:0.5
    },
    plan4:{
        flexDirection:"row"
    },
    plans:{

    },
    find:{
        marginLeft:30,
        marginTop:10
    },
    find1:{
        fontFamily: "OwenPro-Medium",
        fontSize:20,
    }
    
})