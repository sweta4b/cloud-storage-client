import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const Files = () => {
  const { fetchUserFiles, files, downloadFile, deleteFile } = useUser()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchUserFiles(user._id);
  }, []);

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId)
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  };

  const handleDownload = async (file) => {
    try {
      await downloadFile(file)
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  function formatFileSize(bytes, decimalPoint) {
    if (bytes === 0) return '0 Bytes';
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const getExtension = (filename) => filename.slice(filename.lastIndexOf("."));


  return (
    <div className="mt-4 ">
      {files.length ?
        <>
          <h2 className="text-2xl font-semibold text-blue-600 text-left">All Files</h2>
          <div className="overflow-x-auto">
            <table className="table-auto mt-4 min-w-full border-spacing-y-4 border-separate rounded-xl  w-full">
              <thead >
                <tr className="  text-blue-800 rounded p-2 mt-6 w-full bg-[#F0F6FD]  ">
                  <th className=" px-4 py-2 ">S.No</th>
                  <th className=" px-4 py-2">File Name</th>
                  <th className=" px-4 py-2">Type</th>
                  <th className=" px-4 py-2">File Size</th>
                  <th className=" px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody >

                {files.map((file, index) => (
                  <tr key={file._id} className="text-blue-600 rounded-xl p-4 mt-6 w-full bg-[#F0F6FD]  ">
                    <td className=" p-4 ">{index + 1}</td>
                    <td className=" p-4 ">{file.name}</td>
                    <td className=" p-4">{getExtension(file.name)}</td>
                    <td className=" p-4">{formatFileSize(file.size, 2)}</td>
                    <td className=" p-4 flex justify-center gap-4">
                      <i className="fa fa-download hover:scale-125 ease-in-out duration-300 cursor-pointer " onClick={() => handleDownload(file)}></i>
                      {' '}
                      <i className="fa fa-trash hover:scale-125 ease-in-out duration-300 cursor-pointer text-red-700" onClick={() => handleDelete(file._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </> : null}
    </div>
  );

}

export default Files;