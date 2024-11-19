import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post('/image-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("response.data",response.data)
        return response.data ;
    } catch (error) {
        console.log('Image upload error:', error); // Hata mesajını yazdırın
        throw error;
    }
};

export default uploadImage;
