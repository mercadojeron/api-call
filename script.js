<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Market Data</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">

    <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Stock Market Data</h1>

        <div id="dataContainer" class="space-y-4">
            <!-- Stock data will be displayed here -->
            <p>No data available</p>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between mt-6">
            <button id="prevButton" class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled>Previous</button>
            <button id="nextButton" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        const apiKey = 'd0b0729f5493df0b1ad08db3f9b28b83';  // Replace with your actual Marketstack API key
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const symbol = 'AAPL';  // Change to your desired stock symbol
        let currentPage = 1;
        const limit = 10;

        // Fetch stock market data from Marketstack API
        function fetchStockData(page = 1) {
            const url = `${corsProxy}https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${symbol}&limit=${limit}&offset=${(page - 1) * limit}`;

            axios.get(url)
                .then(response => {
                    const data = response.data;
                    displayData(data);
                    updatePaginationControls(page, data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    displayError(error);
                });
        }

        // Display the fetched data
        function displayData(data) {
            console.log(data);  // Log the response for debugging
            const container = document.getElementById('dataContainer');
            container.innerHTML = ''; // Clear previous data

            if (data && data.data && data.data.length > 0) {
                data.data.forEach(item => {
                    const div = document.createElement('div');
                    div.classList = 'p-4 bg-white border border-gray-300 rounded shadow';
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

        // Handle pagination buttons
        function updatePaginationControls(page, data) {
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');

            if (page === 1) {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }

            // Check if there is a next page (by comparing length of data)
            if (data.data && data.data.length < limit) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        }

        // Error handling
        function displayError(error) {
            const container = document.getElementById('dataContainer');
            container.innerHTML = `<p class="text-red-500">Failed to fetch data: ${error.message}</p>`;
        }

        // Pagination button event listeners
        document.getElementById('prevButton').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchStockData(currentPage);
            }
        });

        document.getElementById('nextButton').addEventListener('click', () => {
            currentPage++;
            fetchStockData(currentPage);
        });

        // Initial fetch of stock data
        fetchStockData(currentPage);

    </script>
</body>
</html>
