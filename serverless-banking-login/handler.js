import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import jwt from "jsonwebtoken"; // Import JWT library for decoding

const client = new DynamoDBClient({ region: "us-east-2" });

export async function fetchUserData(event) {
  try {
    // Extract JWT token from the Authorization header
    const token = event.headers.Authorization.split(' ')[1]; // Bearer <token>

    // Decode the JWT token to get the payload
    const decoded = jwt.decode(token);

    // Extract the userId (sub) from the token
    const userId = decoded.sub;

    const params = {
      TableName: "Users",
      Key: {
        userId: { S: userId },
      },
    };

    const data = await client.send(new GetItemCommand(params));

    const userData = data.Item
      ? {
          userId: userId,
          name: data.Item.name?.S || "N/A",
          email: data.Item.email?.S || "N/A",
          accountBalance: data.Item.accountBalance ? parseFloat(data.Item.accountBalance.N) : 0.0,
          lastTransaction: data.Item.lastTransaction
            ? {
                date: data.Item.lastTransaction.M.date?.S || "N/A",
                amount: data.Item.lastTransaction.M.amount ? parseFloat(data.Item.lastTransaction.M.amount.N) : 0.0,
                description: data.Item.lastTransaction.M.description?.S || "N/A",
              }
            : null,
        }
      : null;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      body: JSON.stringify(userData),
    };
  } catch (err) {
    console.error("Error fetching user data:", err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      body: JSON.stringify({ error: "Could not retrieve user data" }),
    };
  }
}
