import { useState } from 'react';

export default function FirstPlant() {
  const [hasPermission, setHasPermission] = useState(null);
  const [detections, setDetections] = useState([]);
  const [plantName, setPlantName] = useState(''); // New state variable for plant name
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(true);

  // ... (other code)

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
        const response = await axios.post('http://10.5.9.179:5000/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setDetections(response.data);
        setPlantName(response.data); // Update the plant name state
        setModalVisible(true); // Show the modal with the plant name
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // ... (other code)
}