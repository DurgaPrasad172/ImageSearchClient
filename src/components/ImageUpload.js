// // ImageUpload.js
// import React from 'react';
// import { analyzeImage } from '../utils/visionAPI';

// const ImageUpload = ({ onFileUpload }) => {
//     const handleImageChange = async (event) => {
//         try {
//             const file = event.target.files[0];
//             const formData = new FormData();
//             formData.append('image', file);
    
//             // Analyze the image using the Vision API
//             const analysisResult = await analyzeImage(file);
    
//             // Check if the Vision API response has an error
//             if (analysisResult && analysisResult.error) {
//                 throw new Error(analysisResult.error.message || 'Error calling the Vision API');
//             }
    
//             console.log('Analysis Result:', analysisResult);
    
//             // Pass the file and analysis result to the parent component
//             onFileUpload(file, analysisResult);
//         } catch (error) {
//             console.error('Error processing image:', error.message);
//         }
//     };
    

//     return (
//         <div>
//             <h2>Upload your image</h2>
//             <input type="file" onChange={handleImageChange} />
//         </div>
//     );
// };

// export default ImageUpload;



import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null, uploading: false, error: null };
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            this.setState({
                file: URL.createObjectURL(img)
            });

            this.setState({ file: URL.createObjectURL(img), uploading: true, error: null });

            // Use FormData to send the image to the server
            const formData = new FormData();
            formData.append('image', img);

            // Update the API URL to match your server
            axios.post('http://localhost:5024/api/upload', formData)
                .then(response => {
                    // Pass the response data to the parent component
                    this.props.onFileUpload(response.data);
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    this.setState({ error: 'Error uploading image', uploading: false });
                });
        }
    }

    render() {
        return (
            <div>
                <h2>Upload your image</h2>
                <input type="file" onChange={this.onImageChange} />
                {this.state.file && <img src={this.state.file} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </div>
        );
    }
}

export default ImageUpload;
