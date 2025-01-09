import { generateClient } from 'aws-amplify/api'; // Import generateClient
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../graphql/queries';

// Create a GraphQL client instance
const client = generateClient();

// Function to fetch users based on user IDs
export const fetchUsers = async (userIds: any) => {
    const userPromises = userIds.map(async (userId: any) => {
        try {
            const response = await client.graphql({
                query: getUser,
                variables: { id: userId },
            }) as GraphQLResult<any>;
            
            return response.data?.getUser; // Return the fetched user data
        } catch (error) {
            console.error('Error fetching user:', error);
            return null; // Return null if an error occurs
        }
    });

    // Wait for all promises to resolve and filter out any null values
    const fetchedUsers = await Promise.all(userPromises);
    return fetchedUsers.filter(user => user !== null); // Filter out null users
};
