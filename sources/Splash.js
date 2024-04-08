import {View, Image, StyleSheet} from "react-native"

export default function Splash({navigation}) {
    setTimeout(()=> {
        navigation.navigate('Login')
    }, 2000)
    return (
        <View style = {styles.bg}>
            <Image source={require('../assets/pictures/Splash.png')}/>
        </View>
    );
  }

const styles=StyleSheet.create({
    bg:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        width:'100%'
    }

})
  