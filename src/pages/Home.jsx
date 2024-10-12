import React, { useState, useEffect } from "react";
import CryptoCard from "../components/CryptoCard";
import fetchCryptoData from "./Market"; 

const Home = () => {
    const [cryptoData, setCryptoData] = useState([]); // State to store the fetched data

    useEffect(() => {
        const getData = async () => {
            const data = await fetchCryptoData(); // Fetch data
            setCryptoData(data); // Set the state with fetched data
        };

        getData(); // Call the data-fetching function when component mounts
    }, []); // Empty dependency array to run this only once

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <CryptoCard cryptoData={cryptoData} /> {/* Pass the fetched data to the CryptoCard component */}
        </div>
    );
};

export default Home;
