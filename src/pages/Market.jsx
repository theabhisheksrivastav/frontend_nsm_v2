import axiosInstance from "../services/axiosInstance";

// Function to fetch cryptocurrency data
const fetchCryptoData = async () => {
    try {
        const response = await axiosInstance.get('/markets'); // Ensure this is the correct endpoint
        console.log('Response Data:', response); // Log the fetched data
        return response.data.message; // Return the crypto data
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return an empty array on error
    }
};

export default fetchCryptoData;
