import React, { useState, useEffect } from "react";
import axios from 'axios';


function Curdop() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [productImage, setProductImage] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editMode, setEditMode] = useState(false); // Flag to indicate edit mode

    useEffect(() => {
        fetchData();
    }, []); // Fetch product data when the component mounts

    function fetchData() {
        axios.get("http://localhost:3500/products")
            .then((res) => {
                setProducts(res.data);
            });
    }

    function addProduct() {
        const newProduct = {
            productName: productName,
            category: category,
            description: description,
            unitPrice: unitPrice,
            productImage: productImage
        };

        axios.post("http://localhost:3500/products", newProduct)
            .then(() => {
                alert("New product added successfully!");
                clearFields();
                fetchData();
            });
    }

    function deleteProduct(id) {
        axios.delete(`http://localhost:3500/products/${id}`)
            .then(() => {
                alert("Product deleted successfully!");
                fetchData();
            });
    }

    function selectProduct(id) {
        const selectedProduct = products.find(product => product.id === id);
        if (selectedProduct) {
            setProductName(selectedProduct.productName);
            setCategory(selectedProduct.category);
            setDescription(selectedProduct.description);
            setUnitPrice(selectedProduct.unitPrice);
            setProductImage(selectedProduct.productImage);
            setSelectedProductId(id);
            setEditMode(true); // Set edit mode to true
        }
    }

    function updateProduct() {
        const updatedProduct = {
            productName: productName,
            category: category,
            description: description,
            unitPrice: unitPrice,
            productImage: productImage
        };

        axios.put(`http://localhost:3500/products/${selectedProductId}`, updatedProduct)
            .then(() => {
                alert("Product updated successfully!");
                clearFields();
                setEditMode(false); // Reset edit mode to false
                setSelectedProductId(null);
                fetchData();
            });
    }

    function clearFields() {
        setProductName("");
        setCategory("");
        setDescription("");
        setUnitPrice(0);
        setProductImage("");
    }

    const productRows = products.map((product, index) =>
        <tr key={index}>
            <td>{product.id}</td>
            <td>{product.productName}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.unitPrice}</td>
            <td><img src={product.productImage} height={100} width={100} alt={product.productName} /></td>
            <td>
                <button className="btn btn-outline-primary" onClick={() => selectProduct(product.id)}>Select</button> |
                <button className="btn btn-outline-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
            </td>
        </tr>
    );

    return (
        <>
            {/* <h3>Server Communication using Axios (CRUD on JSON Server)</h3> */}
            <hr />
            
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="Unit Price" />
            <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} placeholder="Product Image URL" />
            {editMode ? <button className="btn-btn-outline-info " onClick={updateProduct}>Update Product</button> : <button className="btn btn-outline-success " onClick={addProduct}>Add Product</button>}
            <hr />

            <div className="table-responsive">
    <table className="table table-bordered" style={{ width: "100%" }}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Product Image</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {productRows}
        </tbody>
    </table>
</div>

        </>
    );
}

export default Curdop;