import { useState, useContext, useEffect } from 'react';
import Excel from "exceljs";
// import axios from 'axios'
import { ref, getStorage, getBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { ExporterContext } from './contextProvider/exporter'
import { storage } from '../pages/api/firebase';
import { getWorksheetName, EXCEL_EXAMPLE_FILE_PATH } from '../constants'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [worksheet, setWorksheet] = useState({});
  // const storage = getStorage();
  const { generalWorkTime } = useContext(ExporterContext);

  const handleChange = (index:number)=>{
  }

  useEffect(()=>{
    console.log(generalWorkTime.targetMonth)
    if(!generalWorkTime.targetMonth){
      return
    }
    const starsRef = ref(storage, EXCEL_EXAMPLE_FILE_PATH);
    getBytes(starsRef)
    .then(async res => {
      // console.log(res);
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(res);
      setWorksheet(workbook.getWorksheet(getWorksheetName(generalWorkTime.targetMonth)));
      // const worksheet = workbook.getWorksheet(getWorksheetName(generalWorkTime.targetMonth));
      // console.log('1107', worksheet)
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
  }, [generalWorkTime])

  return(
    <>

    </>
  )
}