
const CryptoCard = ( {cryptoData} ) => {
  return (
    <main className="flex-grow p-6 w-svw max-w-6xl mx-auto bg-white border border-gray-300 shadow-2xl rounded-lg mt-20">
    <h2 className="text-center font-semibold text-lg mb-6 border-b">CRYPTOCURRENCY TICKERS & PRICES</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-sm text-gray-500">
          <th className="py-3 px-4">Symbol</th>
          <th className="py-3 px-4">Coin</th>
          <th className="py-3 px-4">Buy Price</th>
          <th className="py-3 px-4">Sell Price</th>
          <th className="py-3 px-4">Change (24hr)</th>
         
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((crypto, index) => (
          <tr key={index} className="text-sm text-gray-700 border-b">
            <td className="py-5 px-4">{crypto.cryptoname.charAt(0)}</td>
            <td className="py-5 px-4">{crypto.cryptoname}</td>
            <td className="py-5 px-4">{crypto.cryptoprice ? crypto.cryptoprice.toFixed(2) : 'N/A'}</td>
            <td className="py-5 px-4">{crypto.cryptoprice ? crypto.cryptoprice.toFixed(2) : 'N/A'}</td>
            <td className={`py-5 px-4 ${crypto.cryptoprice >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {crypto.change ? `${crypto.change.toFixed(2)}%` : '0%'}
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </main>
  
  );
};

export default CryptoCard;
