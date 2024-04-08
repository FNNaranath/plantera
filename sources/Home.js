import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Dimensions, FlatList} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Card from '../components/Card';
import Navigation from '../components/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Plants from '../components/Plants';
import Carousel from 'react-native-snap-carousel';
import { exportedUsername } from './Login';
import { getDocs,doc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const {width: ScreenWidth} = Dimensions.get('window')

const sliderWidth = ScreenWidth

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export let exportedfriendname = ''
export let exportedPlantName = ''


export default function Home({navigation}){
    let [fontsLoaded] = useFonts({
        "OwenPro-Bold": require("../assets/fonts/OwenPro-Bold.otf"),
        "OwenPro-SemiBold": require("../assets/fonts/OwenPro-SemiBold.otf"),
        "OwenPro-Regular": require("../assets/fonts/OwenPro-Regular.otf"),
        "OwenPro-Medium": require("../assets/fonts/OwenPro-Medium.otf"),
        "OwenPro-Heavy": require("../assets/fonts/OwenPro-Heavy.otf"),
    });


    const [dataValue, setData] = useState([]);
    const [friendsValue, setFriends] = useState([])
    const [selectedfriend, setSelection] = useState('')
    const [selectedPlant, setPlant] = useState('')


    useEffect(()=>{
        const fetchData = async() => {
            try{
                const docSnap = await getDocs(collection(db,'/users/' + exportedUsername + '/Plants'))
                const docFriends = await getDocs(collection(db, '/users/' + exportedUsername + '/Plarents'))
                let data = [];
                let friends = []

                docSnap.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                        id:doc.id
                    },
                    );
                
                });

                docFriends.forEach((doc) => {
                    friends.push({
                        ...doc.data(),
                        id:doc.id
                    })
                    
                })
                setData(data);
                setFriends(friends)
                        } catch(error) {
                console.log('Error fetching data', error);
            }
        };
        fetchData();
        const intervalID = setInterval(fetchData,1000);

        return() => clearInterval(intervalID)

    }, []);


    const renderItem = ({ item }) => {
        return(
            <View>
                <View style = {styles.root}>
                    <View style={styles.box} >
                        <Image style = {styles.plant} source={{ uri: item.pic }}/>
                        
                        <View style = {styles.nameContainer}>
                            <Text style = {styles.name}>{item.Name}</Text>
                            <Text style = {styles.nickname}>{item.Nickname}</Text>
                        </View>

                        <View style = {styles.icon}> 
                            <Image style = {styles.icon1} source={require('../assets/icons/sun.png')}/>
                            <Image style = {styles.icon1} source={require('../assets/icons/temp.png')}/>
                            <Image style = {styles.icon1} source={require('../assets/icons/water.png')}/>
                            <Image style = {styles.icon1} source={require('../assets/icons/shovel.png')}/>
                        </View>
                    </View>
                </View>
                    <TouchableOpacity onPress={()=>{setPlant(item.Name), exportedPlantName = item.Name, navigation.navigate('Plan')}}>
                        <View style = {styles.viewbox}> 
                            <Text style = {styles.plan}>View Plan</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        )
    }

    const renderFriends = ({item}) => {
        return(
            <View>
                <TouchableOpacity onPress={()=>{setSelection(item.name), exportedfriendname=item.name, navigation.navigate('OthersGarden')}}> 
                    <View style = {styles.profilen}> 
                        <View style = {styles.myprofile}></View>
                        <Text style = {styles.me}>{item.name}</Text>
                    </View>
                </TouchableOpacity>  
            </View> 
        )
    }

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
                    <Text style = {styles.name1}>Hi, {exportedUsername}</Text>
                    <Text style = {styles.pp}>Check Your Community Out</Text>
                </View> 
                <FlatList
                renderItem = {renderFriends}
                data = {friendsValue}
                ref={(scrollView) => { this.scrollView = scrollView; }}
                style = {styles.scroll}
                //pagingEnabled={true}
                horizontal= {true}
                showsHorizontalScrollIndicator = {false}
                decelerationRate={0}
                snapToInterval={ScreenWidth - 60}
                snapToAlignment={"center"}
                
                contentInset={{
                    top: 0,
                    left: 10,
                    bottom: 0,
                    right: 10,
                    }}>
                </FlatList>

            </View>
                <View style = {styles.garden}>
                    <Text style = {styles.my}>My Garden</Text>
                    <Text style = {styles.number}>(3 plants)</Text>
                </View>

                <View style = {styles.CardCarousel}>
                    <Carousel
                    renderItem={renderItem}
                    data = {dataValue}
                    layout='default'
                    sliderWidth={sliderWidth}
                    itemWidth = {sliderWidth - 120}
                    />
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
    },
    // nav:{
    //     postion: "absolute",  
    // },
    CardCarousel: {
        marginTop: 30
    },
    bg:{
        width:'100%',
        height:'100%',
        backgroundColor:'#E6DACE',
    },
    bg1:{
        width:'100%',
        height:'36%',
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
        marginLeft:25,
        marginTop:30,
        marginBottom:10,
    },
    name1:{
        fontFamily: "OwenPro-Medium",
        fontSize:30,
    },
    pp:{
        fontFamily: "OwenPro-Regular",
        fontSize:15,
        paddingTop:4,
        color: "#95908d"
    },
    community:{
        height:70,
        width:"100%",
        // borderWidth:1,
        // borderColor:"black",
        marginTop:15,
        marginLeft:25,
        //alignItems:"center",
        flexDirection:"row",    
    },
    profilen: {
        alignItems: 'center',
        paddingRight:8
    },
    myprofile:{
        height:62,
        width:62,
        borderRadius:30,
        backgroundColor:"#D9D9D9",
        //justifyContent:"center",
        //alignItems:"center",  
    },
    me:{
        fontFamily:"OwenPro-Regular",
        fontSize:11
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
    // plants:{
    //     alignItems:"center",
    //     justifyContent:"center",

    // },
    // plant:{
    //     fontFamily: "OwenPro-Regular",
    //     fontSize:15,
        
    //},
    viewbox:{
        height: 36,
        width: 150,
        borderRadius: 8,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        marginLeft:60,
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