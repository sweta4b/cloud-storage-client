import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";


const UploadFile = () => {
  const [file, setFile] = useState()
  const { fetchUserFiles } = useUser()

  const upload = async () => {
    const token = localStorage.getItem('token');
    if (!file) {
      console.error('No file selected');
      toast("No File Selected", {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', "")
    try {
      const response = await axios.post('http://localhost:9000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': token,
        },
      });

      if (response.status !== 200) {
        console.error('File upload failed:', response.statusText);
        return;
      }
      setFile("")
      fetchUserFiles()
      console.log('File uploaded successfully:', response.data);
      toast("File uploaded successfully", {
        position: 'bottom-right',
        autoClose: 2000,
      });

    } catch (error) {
      console.error('Error uploading image:', error.message);
      toast("Error uploading file", {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  }
  return (
    <div className="mt-6 ">
      <h2 className='text-3xl font-bold text-blue-600 text-left'>Add File</h2>
      <div className="flex items-center justify-center mt-4 ">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64  rounded-lg cursor-pointer bg-[#F0F6FD]">
          <div className="flex flex-col gap-4 items-center justify-center pt-5 pb-6">
            <i className="fa fa-upload text-8xl text-blue-600"></i>
            <p className="mb-2 text-sm text-blue-600"><span className="font-semibold"> {file ? file.name : "Click to upload "}</span></p>
          </div>
          <input id="dropzone-file" type="file" onChange={(e) => setFile(e.target.files[0])} className='text-center hidden  w-full' />
          {file && <div className="flex gap-4"> <button type="button" className="p-4 mt-2 text-[#F0F6FD] bg-blue-600 hover:bg-red-700 py-2 rounded-md bg-white focus:outline-none focus:shadow-outline-blue" onClick={() => setFile()}>Cancel</button>
            <button type="button" className=" p-4 mt-2 text-[#F0F6FD] py-2 rounded-md  bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue" onClick={upload}>Upload</button></div>}
        </label>
      </div>
    </div>
  )
}

export default UploadFile