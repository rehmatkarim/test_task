import React, { useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import './GlobalStyles.css'
import plusIcon from '../images/plus.png'
import axios from 'axios';


const UploadProd = (props) => {
  const [file, setFile] = useState([])
  let formData = new FormData()


  const onDrop = useCallback((acceptedFiles) => {
    setFile(prev => [...prev, ...acceptedFiles]);



  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleSubmit = async () => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      }
    };
    console.log(file, "::::fileee")
    formData.append('file', ...file)

    console.log(...formData)

    await axios.post('http://localhost:5000/upload', formData, config).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error)
    })

  }
  return (
    <div className="upload-parent-wrap">
      <div>
        <button onClick={handleSubmit}>Validate</button>
      </div>
      <div className="nav-wrapper">
        <button onClick={props.prev}>Products</button>
        <button onClick={props.next}>Results</button>
      </div>
      <div className="file-upload-wrapper">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="file-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} value={props.getState('file', '')} onDrop={onDrop} type="file" />
                <img src={plusIcon} alt="icon" />
                <p>Upload Csv</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default UploadProd;
