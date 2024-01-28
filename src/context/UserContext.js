import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const user = useProvideUser();
    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);


function useProvideUser() {
    const [files, setFiles] = useState([])

    const url = "http://localhost:9000"    


    const fetchUsers = async () => {
        const response = await axios.get(`${url}/users`)
        const data = await response.data;
        return data
      }


    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${url}/users/${userId}`);
            toast("User deleted", {
                position: 'bottom-right',
                autoClose: 2000,
              });
        } catch (error) {
            console.error(" error:", error.message);
        }
    }

    const fetchUserFiles = async (userId) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:9000/${userId}/files`, {
            method: 'GET',
            headers: {
              'authorization': token,
            },
          });
  
          if (!response.ok) {
            console.error('Failed to fetch user files:', response.statusText);
            return;
          }
  
          const data = await response.json();
          setFiles(data);
        } catch (error) {
          console.error('Error fetching user files:', error.message);
        }
      };

      const deleteFile = async (fileId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${url}/user/delete/${fileId}`, {
                headers: {
                    "authorization": token
                }
            });
            setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error.message);
        }
    };

    const downloadFile = async (file) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${url}/user/download/${file._id}`, {
              headers: {
                "authorization": token 
              },
              responseType: 'blob', 
            });
      
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const anchorElement = document.createElement('a');
            anchorElement.href = downloadUrl;
            anchorElement.download = file.name;
            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
          } catch (error) {
            console.error('Error downloading file:', error.message);
          }
    };


    return {
        deleteUser,
        files,
        fetchUserFiles,
        setFiles,
        deleteFile,
        downloadFile,
        fetchUsers
    }

}