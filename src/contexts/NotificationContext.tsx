import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listConnections } from '@/src/graphql/queries';
import { updateConnection } from '@/src/graphql/mutations';

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

      const result = await client.graphql({
        query: listConnections,
        variables: {
          filter: {
            connectedUserID: { eq: authUserID },
          },
        },
      });

      const fetchedNotifications = result.data?.listConnections?.items || [];
      setNotifications(fetchedNotifications);

      // Determine if there are unread notifications
      const unreadExists = fetchedNotifications.some((notification: any) => !notification.viewed);
      setHasNotifications(unreadExists);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  const markNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.viewed);
  
      if (unreadNotifications.length === 0) return; // Prevent unnecessary state updates
  
      // Mark all unread notifications as read
      await Promise.all(
        unreadNotifications.map((notification) =>
          client.graphql({
            query: updateConnection,
            variables: { input: { id: notification.id, viewed: true } },
          })
        )
      );
  
      // Update local state
      const updatedNotifications = notifications.map((notification) =>
        notification.viewed ? notification : { ...notification, viewed: true }
      );
      setNotifications((prev) =>
        JSON.stringify(prev) !== JSON.stringify(updatedNotifications)
          ? updatedNotifications
          : prev
      );
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
