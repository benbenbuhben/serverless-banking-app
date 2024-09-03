import React, { useState, useEffect } from 'react';
import { useAuthenticator, Button, Heading, Flex, Text, View } from '@aws-amplify/ui-react';
import { fetchAuthSession } from '@aws-amplify/auth';

function Welcome() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [userData, setUserData] = useState(null);
  const [noUserData, setNoUserData] = useState(false);

  useEffect(() => {
    async function fetchUserSession() {
      try {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString();

        if (idToken) {
          const response = await fetch('https://270lb8ozjf.execute-api.us-east-2.amazonaws.com/dev/user/data', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data) {
              setUserData(data);
            } else {
              setNoUserData(true);
            }
          } else {
            // Handle non-OK responses
          }
        } else {
          // Handle case where ID token is missing
        }
      } catch (error) {
        // Handle errors fetching the user session or data
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
          {noUserData ? (
            <Text>No user data found.</Text>
          ) : userData ? (
            <View marginTop="20px">
              <Text>User ID: {userData.userId}</Text>
              <Text>Name: {userData.name}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Account Balance: ${userData.accountBalance.toFixed(2)}</Text>
              <Text>Last Transaction: {userData.lastTransaction.description} - ${userData.lastTransaction.amount.toFixed(2)} on {userData.lastTransaction.date}</Text>
            </View>
          ) : (
            <Text>Loading...</Text>
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
