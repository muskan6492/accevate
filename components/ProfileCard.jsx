import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InfoRow = ({ icon, label, value, isLast, accentColor }) => (
    <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
        <View style={[styles.iconBox, { backgroundColor: `${accentColor}10` }]}>
            <Icon name={icon} size={20} color={accentColor} />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const ProfileCard = ({ userData }) => {
    const accentColor = userData?.dashboard?.color?.dynamic_color || '#4f46e5';
    const userName = userData?.user?.name || 'User';
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <View style={styles.card}>
            {/* ID Card Header */}
            <View style={[styles.headerGradient, { backgroundColor: accentColor }]}>
                <View style={styles.avatarContainer}>
                    <Text style={[styles.avatarText, { color: accentColor }]}>{userInitial}</Text>
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerName}>{userName}</Text>
                    <Text style={styles.headerId}>ID: {userData?.user?.userid || 'N/A'}</Text>
                </View>
            </View>

            {/* Content Body */}
            <View style={styles.cardContent}>
                <InfoRow
                    icon="badge"
                    label="User ID"
                    value={userData?.user?.userid || 'N/A'}
                    isLast={false}
                    accentColor={accentColor}
                />
                <InfoRow
                    icon="person"
                    label="Full Name"
                    value={userName}
                    isLast={false}
                    accentColor={accentColor}
                />
                <InfoRow
                    icon="phone-iphone"
                    label="Mobile Number"
                    value={userData?.user?.mobile || 'N/A'}
                    isLast={true}
                    accentColor={accentColor}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
        marginBottom: 32,
        overflow: 'hidden',
    },
    headerGradient: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginRight: 16,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '800',
    },
    headerTextContainer: {
        flex: 1,
    },
    headerName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
    },
    headerId: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    cardContent: {
        padding: 24,
        paddingTop: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    infoRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    infoValue: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ProfileCard;
