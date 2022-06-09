import { useState, useContext } from 'react';
import { storage } from '../pages/api/firebase';
import { ref, getStorage, getBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import Excel from "exceljs";
import axios from 'axios'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  // const storage = getStorage();
  const starsRef = ref(storage, 'timesheet/timesheet-example-111.xlsx');

  const getExample = async ()=>{
    let fileDownloadUrl = '';
    getBytes(starsRef)
    .then(async res => {
      console.log(res);
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(res);
      console.log('workbook', workbook)
      console.log('1107', workbook.getWorksheet('11107'))
    })
    // getDownloadURL(starsRef)
    // .then((url) => {
    //   console.log(url);
    //   fileDownloadUrl = url;
    //   requestFileUrl(url)
    //   // Insert url into an <img> tag to "download"

    // })
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

  const requestFileUrl = (url:string)=>{

    axios.get(url,{
      responseType: 'arraybuffer',
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
    ).then(async res=>{
      console.log(res.data)
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(res.data);
      console.log(workbook)
    });
  }

  const handleChange = (index:number)=>{
  }

  return(
    <>
      <button onClick={getExample}>
        GetFile
      </button>
    </>
  )
}