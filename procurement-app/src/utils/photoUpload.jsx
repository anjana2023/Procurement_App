import axios from "axios";

const uploadImagesToCloudinary = async (imagesFile) => {
  try {
    const promises = imagesFile.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "uaunoxhc");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dszh7trt3/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data || !response.data.secure_url) {
        throw new Error("Failed to upload the file to Cloudinary");
      }

      return response.data.secure_url;
    });

    const uploadImageUrls = await Promise.all(promises);
    return uploadImageUrls;
  } catch (error) {
    throw error;
  }
};

export default uploadImagesToCloudinary;
