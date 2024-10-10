import { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import { useDropzone, Accept } from "react-dropzone";
import PulseLoader from "react-spinners/PulseLoader";
import uploadImagesToCloudinary from "../utils/photoUpload";

const PhotoUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  file,
  isHotelDocumentUpload = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxFiles = parseInt(file);

  useEffect(() => {
    setSelectedFiles([]);
  }, [isOpen]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (selectedFiles.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [selectedFiles, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] } ,
    maxSize: 10485760,
    multiple: maxFiles !== 1,
  });

  const handleRemoveFile = (file) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    setLoading(true);
    const fileUrls = await uploadImagesToCloudinary(selectedFiles);
    onUpload(fileUrls);
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Use a flexible width for responsiveness
          maxWidth: "600px", // Set a maximum width for larger screens
          padding: "20px",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Upload Files</h2>

        <div
          className="flex justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500 text-center">Drop the files here...</p>
          ) : (
            <p className="text-gray-500 text-center">Drag and drop files here, or click to select</p>
          )}
        </div>

        {/* Preview of selected files */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt="preview"
                className="w-full h-24 object-cover rounded" 
                style={{ maxHeight: "120px", maxWidth: "120px" }}
              />
              <button
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                onClick={() => handleRemoveFile(file)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-gray-400 text-white py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>

          {loading ? (
            <button className="bg-blue-600 text-white py-2 px-4 rounded flex items-center">
              <span>Uploading...</span>
              <PulseLoader color="#fff" size={8} className="ml-2" />
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PhotoUploadModal;