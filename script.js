document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Prepare data to be sent to restdb.io
    const data = {
        name: name,
        email: email
    };

    // API endpoint URL (replace YOUR_COLLECTION with your actual collection name)
    const apiUrl = 'https://mokesell-1e1c.restdb.io/rest/system_jobs';

    // API key from restdb.io
    const apiKey = '679717f9f9d2bbe70d181e2e';  // Replace with your actual API key

    // Send data using fetch
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey,
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Data submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit data.');
    });
});









