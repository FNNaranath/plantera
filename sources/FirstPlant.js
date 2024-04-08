import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, Modal } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType} from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios'
import { exportedSignup } from './Signup';
import { uploadToFirebase } from '../firebaseConfig';

export let exportedImage;
export let exportedObject

export default function FirstPlant({navigation}) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [detections, setDetections] = useState([]);
  const [objectName, setObjectName] = useState('');
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [image, setImage] = useState(null)
  const [photoUri, setPhotoUri] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleImageCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      

      setImage(photo.uri);
      setPhotoUri(photo.uri)
      setPhotoTaken(true)
      setObjectName('')
      detectObjects(photo.uri);
      exportedImage = image;
      exportedObject = objectName
    }
  };

  const handleRetakePicture = () => {
    setObjectName('')
    setPhotoUri(null);
    setPhotoTaken(false);
  };

  const handleNextPage = () => {
    navigation.navigate('Nickname', { detections });
  };

  const detectObjects = async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('http://192.168.70.251:5000/detect', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const fileName = exportedSignup + objectName
      const upload = await uploadToFirebase(photoUri,fileName, exportedSignup, (v) => console.log(v))
      console.log(upload)

      const detectedObjectName = await response.text();
      setObjectName(detectedObjectName);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
if (objectName === '') {
  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.container} type={Camera.Constants.Type.back} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Take a picture of your First plant</Text>
          <Button title="Start" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <View style = {styles.buttonContainer1}>
        <TouchableOpacity style = {styles.buttonContainer2}>
        <Button title="" onPress={handleImageCapture} />
        </TouchableOpacity>
      </View>
      </View>
  )
}
else {
  return(
    <View style = {styles.photoSize}>
    <View style = {styles.pictureBorder}>
    <Image source={{uri: image}} style={styles.picture}></Image>
    </View>
    {objectName && <Text style = {styles.detectedText}>Detected Object: {objectName}</Text>}
    <View style = {{flexDirection: 'row',}}>
      <View style= {styles.retake}>
        <TouchableOpacity  style={styles.button1} onPress={handleRetakePicture}>
          <Text style = {styles.buttonText1}>Retake Picture</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.nextPage}>
        <TouchableOpacity style={styles.button} onPress={()=> {navigation.navigate('NewUser')}}>
          <Text style = {styles.buttonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
      </View>
    
   
    
  </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4ECE6',
    flex: 1,
    width:"100%",
    marginBottom : -100,
  },
  buttonText:{
    fontSize:17,
    fontFamily:"OwenPro-Medium"
  },
  buttonText1:{
    fontSize:17,
    fontFamily:"OwenPro-Regular",
    color:'red'
  },
  detectedText: {
    marginTop: 20,
    
    justifyContent:'center',
    alignItems:'center',
    fontFamily:"OwenPro-Medium"


  },
  retake:{
    flexDirection:'row',
    marginTop:30,
    
    justifyContent:'space-between'
  },
  nextPage: {
    marginTop: 30

  },
  button:{
    height: 54,
    width: 140,
    borderRadius: 10,
    backgroundColor: "#A7C744",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button1:{
    height: 54,
    width: 140,
    borderRadius: 10,
    marginRight: 10,
    borderColor:'red',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    height:60,
    width:60,
    marginLeft:10,
    marginRight:4,     
},
  photoSize:{
    alignItems: 'center',
    paddingTop: 90,
    backgroundColor: '#F4ECE6',
    height:'100%',
    width:'100%'
  },
  pictureBorder: {
    borderRadius: 30,
    
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  picture: {
    height: 400,
    width: 350,
    borderRadius: 30

  }
})