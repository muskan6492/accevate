import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatCard = ({ title, value, color, icon, isHero }) => {
    return (
        <View style={[
            styles.statCard,
            isHero ? styles.heroCard : styles.gridCard,
            { borderTopColor: color }
        ]}>
            <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
                <Icon name={icon} size={isHero ? 32 : 24} color={color} />
            </View>
            <View style={styles.statContent}>
                <Text style={styles.statTitle}>{title}</Text>
                <Text style={[styles.statValue, isHero && styles.heroValue]}>{value}</Text>
            </View>
        </View>
    );
};



const StudentStats = ({ userData }) => {
    const boys = parseInt(userData?.dashboard?.student?.Boy || 0);
    const girls = parseInt(userData?.dashboard?.student?.Girl || 0);
    const total = boys + girls;

    return (
        <View style={styles.container}>
            {/* Hero Section */}
            {/* Hero Section: Split Badge Design */}
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Student Composition</Text>

                <View style={styles.splitCardContainer}>
                    {/* Left Side: Boys */}
                    <View style={[styles.splitSide, { backgroundColor: '#eff6ff' }]}>
                        <Icon name="male" size={24} color="#3b82f6" />
                        <Text style={[styles.splitLabel, { color: '#3b82f6' }]}>Boys</Text>
                        <Text style={[styles.splitValue, { color: '#3b82f6' }]}>{boys}</Text>
                    </View>

                    {/* Right Side: Girls */}
                    <View style={[styles.splitSide, { backgroundColor: '#fdf2f8' }]}>
                        <Icon name="female" size={24} color="#ec4899" />
                        <Text style={[styles.splitLabel, { color: '#ec4899' }]}>Girls</Text>
                        <Text style={[styles.splitValue, { color: '#ec4899' }]}>{girls}</Text>
                    </View>

                    {/* Central Total Badge */}
                    <View style={styles.centerBadge}>
                        <Text style={styles.centerLabel}>TOTAL</Text>
                        <Text style={styles.centerValue}>{total}</Text>
                    </View>
                </View>
            </View>

            {/* Breakdown Grid */}
            <Text style={styles.sectionTitle}>Distribution</Text>
            <View style={styles.grid}>
                <StatCard
                    title="Boys"
                    value={boys}
                    color="#3b82f6"
                    icon="male"
                    isHero={false}
                />
                <StatCard
                    title="Girls"
                    value={girls}
                    color="#ec4899"
                    icon="female"
                    isHero={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    heroSection: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    heroTitle: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 16,
        textAlign: 'center',
    },
    splitCardContainer: {
        flexDirection: 'row',
        height: 120,
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
    },
    splitSide: {
        flex: 1, // Take up 50% width
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    splitLabel: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 4,
        marginBottom: 2,
    },
    splitValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    centerBadge: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 90,
        height: 90,
        marginLeft: -45, // Half of width to center
        marginTop: -45, // Half of height to center
        borderRadius: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 4,
        borderColor: '#fff',
    },
    centerLabel: {
        fontSize: 10,
        color: '#94a3b8',
        fontWeight: '700',
        letterSpacing: 1,
    },
    centerValue: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0f172a',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 16,
        marginLeft: 4,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16, // Use gap for consistent spacing
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
        flex: 1, // Ensure cards take equal width
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        alignItems: 'center', // Center content horizontally within card
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 12, // Removed for row layout
        marginRight: 12, // Added spacing between icon and text
    },
    statContent: {
        flex: 1,
        // alignItems: 'center', // Removed to allow left alignment in row mode
    },
    statTitle: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: 24, // Slightly larger value
        fontWeight: '800',
        color: '#0f172a',
    },
    // Hero styles overrides if needed
    heroCard: {
        alignItems: 'stretch', // Hero card content should not be centered
        padding: 24,
    },
    gridCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Push content to sides or keep close depending on design
        paddingVertical: 16,
    },
    heroValue: {
        fontSize: 36,
    }
});

export default StudentStats;
