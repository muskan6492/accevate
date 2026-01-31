import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FinancialStats from '../components/FinancialStats';
import { getDashboardData } from '../services/api';

const FinancialScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        if (!refreshing) setIsLoading(true);
        const result = await getDashboardData();
        if (result.success) setUserData(result.data);
        setIsLoading(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    if (isLoading && !userData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Financial Summary</Text>
                </View>
                <FinancialStats userData={userData} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { padding: 24 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backButton: { marginRight: 16, padding: 4 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
});

export default FinancialScreen;
