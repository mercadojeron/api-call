const apiKey = 'd0b0729f5493df0b1ad08db3f9b28b83';
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://api.marketstack.com/v1/eod';
const symbol = 'AAPL';
let currentPage = 1;

async function fetchStockData(page = 1) {
    try {
        const url = `${corsProxy}${baseUrl}?access_key=${apiKey}&symbols=${symbol}&limit=10&offset=${(page - 1) * 10}`;
        console.log("Request URL:", url); // Debugging: Log the full URL being requested
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        displayData(data);
        
        document.getElementById('prevButton').disabled = page === 1;
    } catch (error) {
        console.error("Fetch Error:", error);
        alert(`Failed to fetch data: ${error.message}`);
    }
}

function displayData(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const div = document.createElement('div');
            div.classList = 'p-2 border-b border-gray-200';
            div.innerHTML = `
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Symbol:</strong> ${item.symbol}</p>
                <p><strong>Close Price:</strong> ${item.close}</p>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<p>No data available</p>';
    }
}

document.getElementById('nextButton').addEventListener('click', () => {
    currentPage++;
    fetchStockData(currentPage);
});

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchStockData(currentPage);
    }
});

fetchStockData(currentPage);
