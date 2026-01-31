import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearToken } from '../services/api';
import CustomModal from './CustomModal';

const CustomDrawerContent = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleLogout = async () => {
        setModalVisible(false);
        await clearToken();
        props.navigation.replace('Login');
    };

    const confirmLogout = () => {
        setModalVisible(true);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff', paddingTop: 0 }}>
                <View style={styles.drawerHeader}>
                    <View style={styles.profileCircle}>
                        <Image
                            source={require('../assets/applogo.png')}
                            style={{ width: 60, height: 60, resizeMode: 'contain' }}
                        />
                    </View>
                    <Text style={styles.drawerTitle}>Secure App</Text>
                    <Text style={styles.drawerSubtitle}>Dashboard Menu</Text>
                </View>
                <View style={styles.drawerItems}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.bottomSection}>
                <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="logout" size={24} color="#ef4444" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <CustomModal
                visible={modalVisible}
                title="Logout"
                message="Are you sure you want to logout?"
                actions={[
                    { text: 'Cancel', onPress: () => setModalVisible(false), style: 'default' },
                    { text: 'Logout', onPress: handleLogout, style: 'destructive' }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
    },
    drawerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
    },
    drawerSubtitle: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    drawerItems: {
        flex: 1,
        paddingTop: 10,
    },
    bottomSection: {
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        padding: 20,
    },
    logoutButton: {
        paddingVertical: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ef4444',
        marginLeft: 10,
    },
});

export default CustomDrawerContent;
