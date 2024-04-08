import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType} from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios'

export default function CameraButton() {
  const [hasPermission, setHasPermission] = useState(null);
  const [detections, setDetections] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleImageCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      try {
        const response = await axios.post('http://192.168.70.251:5000/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setDetections(response.data);
        // Navigate to the NicknameScreen
      navigation.navigate('Nickname', { detections: response.data });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.container} type={Camera.Constants.Type.back} />
      <View style = {styles.buttonContainer1}>
        <View style = {styles.buttonContainer2}>
        <Button title="" onPress={handleImageCapture} />
        {detections.map((detection, index) => (
          <Text key={index}>
            {detection.name} ({detection.confidence.toFixed(2)}) - ({detection.xmin}, {detection.ymin}) ({detection.xmax}, {detection.ymax})
          </Text>
        ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    marginBottom : -100,
  },

  buttonContainer2:{
    height: 65,
    width: 65,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    zIndex: 1,
    backgroundColor: "white"
  },
  buttonContainer1: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'white',
    height:75,
    width:75,
    borderRadius:40,
    marginLeft:160,
    marginBottom:120,
    color:"black"
  
  },
});