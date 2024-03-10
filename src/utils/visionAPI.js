// visionAPI.js
import axios from 'axios';

const API_KEY = 'AIzaSyBmS5_OXm0tKHtu0koiojPhBB2U1yZ7zTE';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export const analyzeImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const requestBody = {
            requests: [
                {
                    image: {
                        content: image
                    },
                    features: [
                        { type: 'LABEL_DETECTION', maxResults: 5 }
                    ]
                }
            ]
        };
        

        const response = await axios.post(API_URL, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                

            },
        });

        return response.data;
    } catch (error) {
        console.error('Error calling the Vision API', error);
        throw error;
    }
};
