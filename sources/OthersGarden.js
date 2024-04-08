import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Dimensions, FlatList} from 'react-native';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 
import Card from '../components/Card';
import Navigation from '../components/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Plants from '../components/Plants';
import Carousel from 'react-native-snap-carousel';
import { db } from '../firebaseConfig';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { exportedUsername } from './Login';
import { exportedfriendname } from './Home';
import { firestore } from '../firebaseConfig';

const {width: ScreenWidth} = Dimensions.get('window')

const sliderWidth = ScreenWidth

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export default function OthersGarden(){
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            setFollowingCount(followingCount + 1);
        } else {
            setFollowingCount(followingCount - 1);
        }
    };
    //const userId = 'joel'; // Replace with your actual user ID


    
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
const [gardensValue, setGardens] = useState([]);
const [friendPlant, setPlant] = useState([])

useEffect(() => {
    // Fetch initial follow status and followers count
    const fetchFollowData = async () => {
        try {
            const userDoc = await firestore().collection('users').doc(userId).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                setFollowing(userData.following);
                setFollowersCount(userData.followersCount);
            }
        } catch (error) {
            console.error('Error fetching follow data: ', error);
        }
    };
    fetchFollowData();
}, []);

const handleFollowPress = async () => {
    const newFollowersCount = following ? followersCount - 1 : followersCount + 1;
    setFollowing(!following);
    setFollowersCount(newFollowersCount);
    try {
        await firestore()
            .collection('users')
            .doc(userId)
            .update({
                following: !following,
                followersCount: newFollowersCount,
            });
        console.log('Follow status updated successfully!');
    } catch (error) {
        console.error('Error updating follow status: ', error);
    }
};

useEffect(()=>{
    const fetchData = async() => {
        try{
           const docRef = doc(db,'users',exportedUsername,'Plarents',exportedfriendname)
           const docSnap = await getDoc(docRef)
           const docPlant = await getDocs(collection(db,'/users/' + exportedUsername + '/Plarents/' + exportedfriendname + '/Plants'))
           let plant =[]
           docPlant.forEach((doc) => {
            plant.push({
                ...doc.data(),
                id:doc.id
            },
            );
        
        });
        setPlant(plant)
           if (docSnap.exists()) {
            setGardens(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch(error) {
            console.log('Error fetching data', error);
        }
    };
    fetchData();
    const intervalID = setInterval(fetchData,300);

    return() => clearInterval(intervalID)

}, []);


const renderItem = ({ item }) => {
    return(
        <View style = {styles.root}>
            <View style={styles.box} >
                <Image style = {styles.plant} source={item.pic}/>
                
                <View style = {styles.nameContainer}>
                    <Text style = {styles.name} >{item.name}</Text>
                    <Text style = {styles.nickname}>{item.nickname}</Text>
                </View>

                <View style = {styles.icon}> 
                    <Image style = {styles.icon1} source={require('../assets/icons/sun.png')}/>
                    <Image style = {styles.icon1} source={require('../assets/icons/temp.png')}/>
                    <Image style = {styles.icon1} source={require('../assets/icons/water.png')}/>
                    <Image style = {styles.icon1} source={require('../assets/icons/shovel.png')}/>
                </View>
            </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Plan')}}>
                    <View style = {styles.viewbox}> 
                        <Text style = {styles.plan}>View Plan</Text>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

const renderGardens = ({item}) => {
    return(
        <View>
            <View style = {styles.garden}>
                <Text style = {styles.my}>{item.name}'s Garden</Text>
                <Text style = {styles.number}>{item.plant} plants</Text>
            </View>

            <View style = {styles.garden1}> 
                <Text style = {styles.plarent}>{item.pronoun}</Text>
            </View>

            <View style = {styles.statistics}>
                <View style = {styles.stat}>
                    <Text style = {styles.followers}>{item.followers}</Text>
                    <Text style = {styles.foltext}>Followers</Text> 
                </View>
                        
                <View style = {styles.stat}>
                    <Text style = {styles.following}>{item.following}</Text> 
                    <Text style = {styles.foltext}>Following</Text>
                </View>

                <TouchableOpacity>
                    <View style = {styles.followbutton}>
                        <Text style = {styles.plan}>Follow</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

}

    return(
        <View style = {styles.bg}>
        {console.log('This is exported friendname' + exportedfriendname)}
            <View style = {styles.bg1}>
                <View style = {styles.logo}>
                    <Image style = {styles.logo1} source={require('../assets/pictures/logo.png')}/>
                </View>

                <View>
                    <View style = {styles.garden}>
                        <Text style = {styles.my}>{gardensValue.name}'s Garden</Text>
                        <Text style = {styles.number}>3 plants</Text>
                    </View>

                    <View style = {styles.garden1}> 
                        <Text style = {styles.plarent}>{gardensValue.pronoun}</Text>
                    </View>

                    <View style = {styles.statistics}>
                        <View style = {styles.stat}>
                            <Text style = {styles.followers}>{followingCount}</Text>
                            <Text style = {styles.foltext}>Followers</Text> 
                        </View>
                                
                        <View style = {styles.stat}>
                            <Text style = {styles.following}>{gardensValue.following}</Text> 
                            <Text style = {styles.foltext}>Following</Text>
                        </View>

                        <TouchableOpacity onPress={handleFollow}>
                            <View style = {styles.followbutton}>
                                <Text style = {styles.buttonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                    
                

                {/* <View>
                    <View style = {styles.garden}>
                        <Text style = {styles.my}>{item.name}'s Garden</Text>
                        <Text style = {styles.number}>{item.plant}</Text>
                    </View>

                    <View style = {styles.garden1}> 
                    <Text style = {styles.plarent}>{item.pronoun}</Text>
                    </View>

                    <View style = {styles.statistics}>
                        <View style = {styles.stat}>
                            <Text style = {styles.followers}>{item.followers}</Text>
                            <Text style = {styles.foltext}>Followers</Text> 
                        </View>
                        
                        <View style = {styles.stat}>
                            <Text style = {styles.following}>{item.following}</Text> 
                            <Text style = {styles.foltext}>Following</Text>
                        </View>

                        <TouchableOpacity>
                            <View style = {styles.followbutton}>
                                <Text style = {styles.plan}>Follow</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
            <View style = {styles.CardCarousel}>
                    <Carousel
                    renderItem={renderItem}
                    data = {friendPlant}
                    layout='default'
                    sliderWidth={sliderWidth}
                    itemWidth = {sliderWidth -120}
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
        height:'32.5%',
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
    followbutton:{
        height: 36,
        width: 130,
        borderRadius: 8,
        backgroundColor: "#A7C744",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:50,
        marginTop:-20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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
        marginTop:44,
        marginLeft:35,
        flexDirection:"row"
    },
    garden1:{
        paddingTop:5,
        marginLeft:35
    },
    my:{
        fontSize:22,
        fontFamily:"OwenPro-Medium"
    },
    plarent:{
        fontSize:13,
        fontFamily:"OwenPro-Regular",
        opacity:0.5
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
        marginLeft:5,
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
    statistics:{
        flexDirection:"row",
        paddingBottom:20,
        paddingTop:20,
        marginLeft:40
    },
    stat:{
        alignItems:"center",
        paddingRight:10,
        justifyContent:"center"
    },
    followers:{
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    following:{
        fontFamily: "OwenPro-Regular",
        fontSize:20,
    },
    foltext:{
        fontFamily: "OwenPro-Regular",
        fontSize:14,
    },
})