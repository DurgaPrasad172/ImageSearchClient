import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ProductDisplay from './components/ProductDisplay';
import './App.css';

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleImageUpload = async (formData) => {
        try {
            const response = await fetch('http://localhost:5024/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error uploading image');
            }

            const products = await response.json();
            setSearchResults(products);
            setError(null);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            setError('Internal Server Error. Please try again.');
        }
    };

    return (
        <div className="App">
            <h1>Image Search App</h1>
            <ImageUpload onFileUpload={handleImageUpload} />
            {error && <div className="error-message">{error}</div>}
            <ProductDisplay products={searchResults} />
        </div>
    );
};

export default App;
