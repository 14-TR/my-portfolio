document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year-select');
    const yearDetails = document.getElementById('year-details');

    // Initialize the map using Leaflet.js
    const map = L.map('map').setView([39.7392, -104.9903], 5); // Default view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Make sure the map container is always correctly sized
    setTimeout(function () {
        map.invalidateSize();
    }, 500);

    // Fetch year data from XML
    fetch('assets/data/about-me.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            const years = xmlDoc.getElementsByTagName('year');

            // Populate the year dropdown
            Array.from(years).forEach(year => {
                const option = document.createElement('option');
                const yearId = year.getAttribute('id');
                option.value = yearId;
                option.textContent = yearId;
                yearSelect.appendChild(option);
            });

            // Handle year selection change
            yearSelect.addEventListener('change', function() {
                const selectedYear = this.value;
                if (selectedYear) {
                    const yearData = Array.from(years).find(year => year.getAttribute('id') === selectedYear);
                    const lat = parseFloat(yearData.querySelector('coordinates').getAttribute('lat'));
                    const lng = parseFloat(yearData.querySelector('coordinates').getAttribute('lng'));
                    const description = yearData.querySelector('description').textContent;

                    // Fly to the selected year's location without resetting the map
                    map.flyTo([lat, lng], 10); // Zoom to the year-specific location
                    yearDetails.innerHTML = `<p>${description}</p>`;

                    // Invalidate map size to ensure it's displayed properly
                    setTimeout(function () {
                        map.invalidateSize();  // Ensure the map retains size after change
                    }, 300);  // A slight delay helps to make sure the layout settles before resizing
                } else {
                    yearDetails.innerHTML = ''; // Clear details if no valid year selected
                }
            });
        })
        .catch(error => console.error('Error loading year data:', error));
});
