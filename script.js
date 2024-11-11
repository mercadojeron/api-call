const apiKey = 'd0b0729f5493df0b1ad08db3f9b28b83';
const baseUrl = 'https://api.marketstack.com/v1/eod';
let currentPage = 1;

// Fetch stock data with pagination support
async function fetchStockData(page = 1) {
    try {
        const response = await fetch(`${baseUrl}?access_key=${apiKey}&limit=10&offset=${(page - 1) * 10}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();
        displayData(data);
        
        // Enable or disable buttons based on page
        document.getElementById('prevButton').disabled = page === 1;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch data. Please try again later.');
    }
}

// Display data in HTML
function displayData(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = ''; // Clear previous data

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

// Button listeners
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

// Initial data load
fetchStockData(currentPage);
