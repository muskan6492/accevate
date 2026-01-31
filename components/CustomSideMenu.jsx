import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearToken } from '../services/api';
import CustomModal from './CustomModal';

const CustomSideMenu = ({ visible, onClose, navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const slideAnim = React.useRef(new Animated.Value(-300)).current; // Start off-screen left

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -300,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 250,
            useNativeDriver: true,
        }).start(() => onClose());
    };

    const handleLogout = async () => {
        setModalVisible(false);
        await clearToken();
        navigation.replace('Login');
    };

    const confirmLogout = () => {
        setModalVisible(true);
    };

    const navigateTo = (screen) => {
        handleClose();
        setTimeout(() => navigation.navigate(screen), 300); // Wait for animation
    };

    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={handleClose}
                animationType="none" // Disable default animation
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={handleClose}
                >
                    <Animated.View
                        style={[
                            styles.menuContainer,
                            { transform: [{ translateX: slideAnim }] }
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ flex: 1 }}
                            onPress={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.profileCircle}>
                                    <Icon name="person" size={40} color="#1e40af" />
                                </View>
                                <Text style={styles.headerTitle}>Dashboard Menu</Text>
                                <Text style={styles.headerSubtitle}>Navigate</Text>
                            </View>

                            {/* Menu Items */}
                            <View style={styles.menuItems}>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => navigateTo('Dashboard')}
                                >
                                    <Icon name="dashboard" size={24} color="#334155" />
                                    <Text style={styles.menuItemText}>Dashboard</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => navigateTo('Profile')}
                                >
                                    <Icon name="person" size={24} color="#334155" />
                                    <Text style={styles.menuItemText}>Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => navigateTo('StudentOverview')}
                                >
                                    <Icon name="school" size={24} color="#334155" />
                                    <Text style={styles.menuItemText}>Student Overview</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => navigateTo('FinancialSummary')}
                                >
                                    <Icon name="attach-money" size={24} color="#334155" />
                                    <Text style={styles.menuItemText}>Financial Summary</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Logout */}
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
                                    <Icon name="logout" size={24} color="#ef4444" />
                                    <Text style={styles.logoutText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>

            <CustomModal
                visible={modalVisible}
                title="Logout"
                message="Are you sure you want to logout?"
                actions={[
                    { text: 'Cancel', onPress: () => setModalVisible(false), style: 'default' },
                    { text: 'Logout', onPress: handleLogout, style: 'destructive' }
                ]}
            />
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    menuContainer: {
        width: '75%',
        height: '100%',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    header: {
        padding: 24,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    profileCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    menuItems: {
        flex: 1,
        paddingTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginLeft: 16,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        padding: 20,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ef4444',
        marginLeft: 12,
    },
});

export default CustomSideMenu;
