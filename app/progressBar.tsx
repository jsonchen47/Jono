// app/ProgressBarScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';

const progressBar = ({ progress }: any) => {
    const router = useRouter();

    useEffect(() => {
        // Automatically dismiss the screen after the loading is complete
        if (progress >= 1) {
            setTimeout(() => {
                router.back();
            }, 1000); // Dismiss after 1 second
        }
    }, [progress, router]);

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.title}>Loading...</Text>
                <Progress.Bar
                    progress={progress}
                    width={300}
                    color="#3b82f6" // Change this color as needed
                    style={styles.progressBar}
                />
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        height: '30%',
    },
    progressContainer: {
        height: '30%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressBar: {
        marginVertical: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#3b82f6',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default progressBar;
