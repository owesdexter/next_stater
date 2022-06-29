// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import 'firebase/analytics'

// Add the Firebase products that you want to use
import { ref, getStorage, getBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/database'
// import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzYDv8HlH72O1uzKgwi7UkZ6J9KW1KVZ4",
  authDomain: "iexporter-essence.firebaseapp.com",
  databaseURL: "https://iexporter-essence-default-rtdb.firebaseio.com",
  projectId: "iexporter-essence",
  storageBucket: "iexporter-essence.appspot.com",
  messagingSenderId: "818818492620",
  appId: "1:818818492620:web:d4915a92fd939f48783a69",
  measurementId: "G-GXLDNF2HBB"
};
import { getWorksheetName, EXCEL_EXAMPLE_FILE_PATH } from '../../../constants';
import type { NextApiRequest, NextApiResponse } from 'next';


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

export default function handler(req: NextApiRequest, res: NextApiResponse<any>){
  const starsRef = ref(storage, EXCEL_EXAMPLE_FILE_PATH);

  getBytes(starsRef)
  .then(async response => {
    res.status(200).send(response);
    // console.log(response);
    // const workbook = new Excel.Workbook();
    // await workbook.xlsx.load(res);
    // setWorksheet(workbook.getWorksheet(getWorksheetName(targetMonth)));
    // // const worksheet = workbook.getWorksheet(getWorksheetName(generalWorkTime.targetMonth));
    // // console.log('1107', worksheet)
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}


