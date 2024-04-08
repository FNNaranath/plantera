import Splash from "./sources/Splash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./sources/Login";
import Signup from "./sources/Signup";
import Home from "./sources/Home";
import Profile from "./sources/Settings";
import Plan from "./sources/Plan";
import ChangePlan from "./sources/ChangePlan";
import OthersPlan from "./sources/OthersPlan";
import MainContainer from "./navigation/MainContainer";
import Navigation from "./sources/Navigation";
import Reminder from "./sources/Reminder";
import OthersGarden from "./sources/OthersGarden";
import FirstPlant from "./sources/FirstPlant";
import NewUser from "./sources/NewUser";
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Splash'
          component={Splash}
        />
        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
        />
        {/* <Stack.Screen
          name='Home'
          component={Home}
        /> */}
        {/* <Stack.Screen
          name='Profile'
          component={Profile}
        /> */}
        <Stack.Screen
          name='Plan'
          component={Plan}
        />
        <Stack.Screen
          name='ChangePlan'
          component={ChangePlan}
        />
        <Stack.Screen
          name='OthersPlan'
          component={OthersPlan}
        />
        <Stack.Screen
          name='OthersGarden'
          component={OthersGarden}
        />
        <Stack.Screen
          name='Navigation'
          component={Navigation}
        />
        <Stack.Screen
          name='FirstPlant'
          component={FirstPlant}
        />
        <Stack.Screen
          name='NewUser'
          component={NewUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}