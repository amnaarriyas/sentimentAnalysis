async function analyzeSentiment() {
    const textInput = document.getElementById('textInput').value; // Ensure this matches the id in your HTML
    const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
    });

    if (response.ok) { // Check if the response is successful
        const data = await response.json();
        
        // Process the data returned from the backend
        console.log(data); // For debugging

        // Construct a result message
        const resultMessage = `
            <strong>Compound Score:</strong> ${data.compound}<br>
            <strong>Positive Score:</strong> ${data.pos}<br>
            <strong>Negative Score:</strong> ${data.neg}<br>
            <strong>Neutral Score:</strong> ${data.neu}
        `;

        // Update the output text element with the result message
        document.getElementById('outputText').innerHTML = resultMessage;
    } else {
        // Handle error responses
        const errorMessage = "Error analyzing sentiment. Please try again.";
        document.getElementById('outputText').innerHTML = errorMessage;
    }
}

// Add event listener to the button
document.getElementById('analyzeButton').addEventListener('click', analyzeSentiment);
