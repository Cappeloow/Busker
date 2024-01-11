export const getAllProducts = async () => {
    const response = await fetch('http://localhost:5000/product/all');
    const data = await response.json();
    return data;
}