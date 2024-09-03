// handler.js

export async function fetchUserData(event) {
  const fakeUserData = {
    userId: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    accountBalance: 1000.50,
    lastTransaction: {
      date: '2024-09-02',
      amount: -100.75,
      description: 'Grocery Store Purchase'
    }
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  // Allow all origins
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', // Allow specific methods
      'Access-Control-Allow-Headers': 'Content-Type,Authorization' // Allow specific headers
    },
    body: JSON.stringify(fakeUserData),
  };
}
