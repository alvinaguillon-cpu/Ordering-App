import { toast } from 'react-toastify';
import axios from 'axios';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];


export const uploadImage = async (file) => { 
  let toastId = null;

 
  if (!file || !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    toast.error('Invalid file or file type', 'File Upload Error');
    return null;
  }
  
  const formData = new FormData();
  formData.append('image', file, file.name);
  
  try {
   
    toastId = toast.success('Uploading...', { progress: 0 }); 

    const response = await axios.post('/api/upload', formData, {
      onUploadProgress: ({ loaded, total }) => {
        const progress = loaded / total;
        if (toastId) toast.update(toastId, { progress });
      },
    });
    
    toast.dismiss(toastId);
    return response.data.url;
    
  } catch (error) {
   
    console.error("Image Upload Failed:", error.response?.data || error.message);
    toast.dismiss(toastId);
    
    
    throw new Error('Image upload failed due to network or server issue.'); 
  }
};