// app.js
document.getElementById('queryForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from submitting the traditional way

  const apiKey = "jT96CC3kx2HMcq9A89ymZIG03GDQ0wkq"; // Replace with your API key
  const externalUserId = document.getElementById('externalUserId').value;
  const query = document.getElementById('query').value;

  try {
    // Create a chat session
    const sessionResponse = await fetch('https://api.on-demand.io/chat/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'apikey': apiKey
      },
      body: JSON.stringify({
        pluginIds: [],
        externalUserId: externalUserId
      })
    });
  
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    // Submit the query
    const queryResponse = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726231447'],
        responseMode: 'sync'
      })
    });

    const queryData = await queryResponse.json();

    // Only display the answer from the response
    const answer = queryData.data.answer;
    document.getElementById('responseOutput').textContent = answer;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('responseOutput').textContent = 'An error occurred. Please check the console for details.';
  }
});