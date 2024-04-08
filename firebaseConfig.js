// Import the functions you need from the SDKs you need
import { initializeApp , getApps, getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3sM-VD3tRryTWBioHf1jUchxvcqwEOUY",
  authDomain: "plantera-aee03.firebaseapp.com",
  projectId: "plantera-aee03",
  storageBucket: "plantera-aee03.appspot.com",
  messagingSenderId: "766720412276",
  appId: "1:766720412276:web:01d027ea41b7bd7cc91f21",
  measurementId: "G-WRNZFQZ2HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

const fbApp = getApp();
const fbStorage = getStorage(app);

// const listFiles = async () => {
//   const storage = getStorage();
//   const listRef = ref(storage, 'images');
//   const listResp = await listAll(listRef);
//   const filePromises = listResp.items.map(async (item) => {
//     const downloadURL = await getDownloadURL(item);
//     return { fullPath: item.fullPath, downloadURL };
//   });

//   return Promise.all(filePromises);
// };

const uploadToFirebase = async (uri, name, username, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(getStorage(), `images/${username}/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadUrl, metadata: uploadTask.snapshot.metadata });
      }
    );
  });
};

export { fbApp, fbStorage, uploadToFirebase};