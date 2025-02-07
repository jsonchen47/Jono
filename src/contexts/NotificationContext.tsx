import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listConnections } from '@/src/graphql/queries';
import { updateConnection } from '@/src/graphql/mutations';
import { listProjects, listJoinRequests } from '@/src/graphql/queries';
import { updateJoinRequest } from '@/src/graphql/mutations';
import { listProjectsWithJoinRequests } from '../backend/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';


interface NotificationContextType {
  hasNotifications: boolean;
  notifications: any[];
  fetchNotifications: () => Promise<void>;
  markNotificationsAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasNotifications, setHasNotifications] = useState(false);
  const client = generateClient();

  const fetchNotifications = async () => {
    try {
      const authUser = await getCurrentUser();
      const authUserID = authUser.userId;
  
      // Fetch connection requests
      const connectionsResult = await client.graphql({
        query: listConnections,
        variables: {
          filter: {
            or: [
              { connectedUserID: { eq: authUserID }, status: { eq: "requested" } }, // For pending requests TO the user
              { userID: { eq: authUserID }, status: { eq: "approved" }, viewed: { eq: false }}, // For APPROVED requests sent BY the user that haven't been seen
            ],
          }
        }
      });
      
      const connections = connectionsResult.data?.listConnections?.items || [];
  
      // Fetch projects owned by the user
      const projectsResult = (await client.graphql({
        query: listProjectsWithJoinRequests,
        variables: { filter: { ownerIDs: { contains: authUserID } } },
      })) as GraphQLResult<any>;
      const ownedProjects = projectsResult?.data?.listProjects?.items || [];
  

      console.log('ownedprojects', ownedProjects)
      
  
      // // Extract join requests from the owned projects
      // const joinRequests = ownedProjects.flatMap((project: any) =>
      //   (project?.joinRequests?.items || []).map((request: any) => ({
      //     ...request,
      //     projectTitle: project.title, // Include project title for context
      //     type: 'joinRequest', // Add a type identifier
      //   }))
      // );
      // Extract join requests with status 'requested' from the owned projects
      
      const joinRequests = ownedProjects.flatMap((project: any) =>
        (project?.joinRequests?.items || [])
          .filter((request: any) => request.status === 'requested') // Filter for 'requested' status
          .map((request: any) => ({
            ...request,
            projectTitle: project.title, // Include project title for context
            type: 'joinRequest',         // Add a type identifier
          }))
      );
      
      console.log('joinRequests: ', ownedProjects[0]?.joinRequests?.items)
        


      // Also extract the join requests that have been approved but not seen
      // Fetch connection requests
      const approvedJoinRequestsResult = await client.graphql({
        query: listJoinRequests,
        variables: {
          filter: {
            or: [
              { userID: { eq: authUserID }, status: { eq: "approved" }, viewed: { eq: false }}, // For APPROVED join requests sent BY the user that haven't been seen
            ],
          }
        }
      });

      const approvedJoinRequests = approvedJoinRequestsResult.data?.listJoinRequests?.items || []

      // Merge and sort notifications by date
      const allNotifications = [
        ...connections.map((c) => ({ ...c, type: 'connectionRequest' })), // Add type identifier
        ...joinRequests,
        ...approvedJoinRequests.map((c) => ({ ...c, type: 'joinRequest' }))
      ].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      console.log('allnotificationslength', allNotifications.length)
  
      // Update state
      setNotifications(allNotifications);
      setHasNotifications(allNotifications.some((n) => !n.viewed));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  
  
  
  const markNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.viewed);
  
      if (unreadNotifications.length === 0) return; // Prevent unnecessary state updates
  
      // Separate notifications by type
      const connectionRequests = unreadNotifications.filter((n) => n.type === 'connectionRequest');
      const joinRequests = unreadNotifications.filter((n) => n.type === 'joinRequest');
  
      // Mark connection requests as read
      const connectionUpdatePromises = connectionRequests.map((notification) =>
        client.graphql({
          query: updateConnection,
          variables: { input: { id: notification.id, viewed: true } },
        })
      );
  
      // Mark join requests as read
      const joinRequestUpdatePromises = joinRequests.map((notification) =>
        client.graphql({
          query: updateJoinRequest, // Replace with the actual mutation for join requests
          variables: { input: { id: notification.id, viewed: true } },
        })
      );
  
      // Execute both sets of updates
      await Promise.all([...connectionUpdatePromises, ...joinRequestUpdatePromises]);
  
      // Update local state
      const updatedNotifications = notifications.map((notification) =>
        notification.viewed ? notification : { ...notification, viewed: true }
      );
      setNotifications(updatedNotifications);
      setHasNotifications(false);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };
  
  

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        hasNotifications,
        notifications,
        fetchNotifications,
        markNotificationsAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
