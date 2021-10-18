import React, { useState } from 'react'
import ImageUpload from 'image-upload-react'
import Typography from '@material-ui/core/Typography';
//important for getting nice style.
import 'image-upload-react/dist/index.css'
import axios from 'axios'
import settings from 'src/_mocks_/settings';
 
function Upload({remote}) {
  const [imageSrc, setImageSrc] = useState();
  const [fileName, setFileName] = useState();

  const set = new settings().init()
 
  const handleImageSelect = (e) => {
  	const file = e.target.files[0];
  	let fFile = new FormData();
  	fFile.append("img", file);
    setImageSrc(URL.createObjectURL(e.target.files[0]));

    axios.post(set.APP_URL+"?page=setImage/", fFile)
    .then(res =>{
    	console.log(res.data);
    	setFileName(res.data.img);
    	remote(res.data.img);
    })
    .catch(err =>{
    	console.log(err)
    });
  }
 
  return (
    <>
    <Typography variant="h7">Choisir l'apercu</Typography>
    <ImageUpload
      handleImageSelect={handleImageSelect}
      imageSrc={imageSrc}
      setImageSrc={setImageSrc}
      style={{
        width: 500,
        height: 350,
        background: 'gold'
      }}
    />
    </>
  )
}
 
export default Upload