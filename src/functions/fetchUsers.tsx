
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../graphql/queries'

export const fetchUsers = async (userIds: any) => {
    const userPromises = userIds.map(async (userId: any) => {
      try {
        const response = await API.graphql(graphqlOperation(getUser, { id: userId }));
        const castedResponse = response as GraphQLResult<any>
        return castedResponse.data?.getUser; // Return the fetched user data
      } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null if an error occurs
      }
    });

    // Wait for all promises to resolve and filter out any null values
    const fetchedUsers = await Promise.all(userPromises);
    return fetchedUsers.filter(user => user !== null); // Filter out null users
};