const { X_AI_API_KEY } = process.env
const X_AI_URL = 'https://api.x.ai/v1/chat/completions'

try {
    const res = await fetch(X_AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${X_AI_API_KEY}`, // Here is your token!
      },
      body: JSON.stringify({ // The headers say you are sending JSON
        model: 'grok-2-latest', // The model you are using today
        "stream": false,
        "temperature": 0,
        messages: [
          {
            role: 'system',
            content: 'Answer as Captain Haddock' // Context for the model
          },
          {
            role: 'user',
            content: 'What is our place in this universe?' // The user query
          }
        ],
      })
    })
    if (!res.ok) throw new Error(`Something is wrong: ${res.status}`)
    const data = await res.json()

    // You are interested in a particular part of the response payload
    console.log(data.choices[0].message.content) // Here is the generated output

    console.log(data)
} catch (err) {
    console.log(err.message)
}