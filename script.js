const apiKey = 'ea66ca047dda977abc2fb994519b29eb'; // Your Marketstack API key
const apiUrl = 'http://api.marketstack.com/v1/eod';

// Function to fetch stock data
async function fetchStockData(symbol) {
    const url = `${apiUrl}?access_key=${apiKey}&symbols=${symbol}`;
    console.log(`Fetching data from: ${url}`);

    try {
        const response = await fetch(url);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Check if there is any data returned
        if (!data.data || data.data.length === 0) {
            document.getElementById('error').textContent = 'No data found. Try another search.';
            return;
        }

        // Call the function to display stock data
        displayStockData(data.data);
        document.getElementById('error').textContent = ''; // Clear any previous error messages
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('error').textContent = 'Failed to fetch data. Please check your API URL and key.';
    }
}

// Function to display stock data in the table
function displayStockData(stocks) {
    const tableBody = document.getElementById('stockBody');
    tableBody.innerHTML = ''; // Clear previous data

    stocks.forEach(stock => {
        const row = `
            <tr>
                <td>${stock.symbol || 'N/A'}</td>
                <td>${new Date(stock.date).toLocaleDateString() || 'N/A'}</td>
                <td>${stock.open.toFixed(2) || 'N/A'}</td>
                <td>${stock.close.toFixed(2) || 'N/A'}</td>
                <td>${stock.high.toFixed(2) || 'N/A'}</td>
                <td>${stock.low.toFixed(2) || 'N/A'}</td>
                <td>${stock.volume.toLocaleString() || 'N/A'}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.trim().toUpperCase();
    if (searchTerm) {
        fetchStockData(searchTerm);
    } else {
        document.getElementById('error').textContent = 'Please enter a stock symbol to search.';
    }
});
