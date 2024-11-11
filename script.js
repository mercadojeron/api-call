// Marketstack API key
const apiKey = 'd0b0729f5493df0b1ad08db3f9b28b83';
const baseUrl = 'https://api.marketstack.com/v1/eod';
let currentPage = 1;

// Function to fetch stock data with pagination
async function fetchStockData(page = 1) {
    try {
        const response = await fetch(`${baseUrl}?access_key=${apiKey}&limit=10&offset=${(page - 1) * 10}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        
        const data = await response.json();
        displayData(data);

        // Enable or disable pagination buttons
        document.getElementById('prevButton').disabled = page === 1;
    } catch (error) {
        console.error("Fetch Error:", error);
        alert(`Failed to fetch data: ${error.message}`);
    }
}

// Function to display data in the HTML container
function displayData(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = ''; // Clear any previous data

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

// Pagination button event listeners
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
