import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';

const homeName = "Home";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions = {({route}) => ({
                tabBarStyle: ({
                    omarginBottom: 30, backgroundColor: "#FFFFF", borderRadius: 30, position: "absolute", height: 60,
                })
                
            })}>


            <Tab.Screen name={homeName} component={HomeTab} options={{headerShown:false}}/>
            <Tab.Screen name={profileName} component={ProfileTab} options={{headerShown:false}}/>
            </Tab.Navigator>


        </NavigationContainer>
    )

}
    
