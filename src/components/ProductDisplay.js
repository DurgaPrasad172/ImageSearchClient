import React from 'react';

const ProductDisplay = ({ products }) => {
    return (
        <div>
            <h2>Similar Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDisplay;
