import React, { useState, useEffect } from 'react';
import { useAuthenticator, Button, Heading, Flex, Text, View } from '@aws-amplify/ui-react';
import { fetchAuthSession } from '@aws-amplify/auth';

function Welcome() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserSession() {
      try {
        console.log('Attempting to fetch the user session...');
        const session = await fetchAuthSession();   // Fetch the authentication session
        console.log('Session fetched:', session);

        const idToken = session?.tokens?.idToken?.toString();
        console.log('Extracted ID Token:', idToken);

        if (idToken) {
          console.log('Attempting to fetch user data from the API...');
          fetch('https://270lb8ozjf.execute-api.us-east-2.amazonaws.com/dev/user/data', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          })
            .then(response => {
              console.log('API response received:', response);
              return response.json();
            })
            .then(data => {
              console.log('User data received from API:', data);
              setUserData(data);
            })
            .catch(error => {
              console.error("Error fetching user data from API:", error);
            });
        } else {
          console.error("ID token not found in session");
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    }

    if (user) {
      fetchUserSession();
    }
  }, [user]);

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" padding="20px">
      <Heading level={2}>Welcome to the Bank!</Heading>
      {user ? (
        <>
          <Text>Welcome, {user.signInDetails?.loginId ? user.signInDetails.loginId : 'User'}!</Text>
          {userData && (
            <View marginTop="20px">
              <Text>User ID: {userData.userId}</Text>
              <Text>Name: {userData.name}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Account Balance: ${userData.accountBalance.toFixed(2)}</Text>
              <Text>Last Transaction: {userData.lastTransaction.description} - ${userData.lastTransaction.amount.toFixed(2)} on {userData.lastTransaction.date}</Text>
            </View>
          )}
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
      <Button variation="primary" onClick={signOut} marginTop="20px">
        Sign Out
      </Button>
    </Flex>
  );
}

export default Welcome;
