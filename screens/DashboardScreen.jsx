import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from './Carousel';
import CustomModal from '../components/CustomModal';
import CustomSideMenu from '../components/CustomSideMenu';
import ProfileCard from '../components/ProfileCard';
import StudentStats from '../components/StudentStats';
import FinancialStats from '../components/FinancialStats';
import { getDashboardData } from '../services/api';

const DashboardScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    actions: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!refreshing) setIsLoading(true);
    const result = await getDashboardData();
    if (result.success) {
      setUserData(result.data);
    } else {
      showModal(
        'Connection Error',
        result.message || 'Unable to load dashboard data.',
        [{ text: 'Retry', onPress: () => { setModalVisible(false); loadDashboardData(); }, style: 'default' }]
      );
    }
    setIsLoading(false);
    setRefreshing(false);
  };

  const showModal = (title, message, actions) => {
    setModalConfig({ title, message, actions });
    setModalVisible(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (isLoading && !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  const accentColor = userData?.dashboard?.color?.dynamic_color || '#4f46e5';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: accentColor + '10' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[accentColor]}
            tintColor={accentColor}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <Icon name="menu" size={28} color="#0f172a" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Welcome back, {userData?.user?.name?.split(' ')[0] || 'User'}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Carousel */}
        {userData?.dashboard?.carousel && userData.dashboard.carousel.length > 0 ? (
          <View style={styles.carouselContainer}>
            <Carousel images={userData.dashboard.carousel} />
          </View>
        ) : null}

        <View style={styles.contentContainer}>
          <ProfileCard userData={userData} />
          <StudentStats userData={userData} />
          <FinancialStats userData={userData} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Dashboard v1.2</Text>
            <Text style={styles.footerSubtext}>Synced: {new Date().toLocaleTimeString()}</Text>
          </View>
        </View>
      </ScrollView>

      <CustomSideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />

      <CustomModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        actions={modalConfig.actions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#64748b' },
  scrollView: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuButton: { padding: 4 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 2, textAlign: 'center' },
  carouselContainer: { marginTop: 20, paddingHorizontal: 16 },
  contentContainer: { padding: 24 },
  footer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  footerText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  footerSubtext: { color: '#cbd5e1', fontSize: 12, marginTop: 4 },
});

export default DashboardScreen;
