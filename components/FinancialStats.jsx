import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

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

const CircularProgress = ({ size, strokeWidth, progress, color, bgColor }) => {
    const radius = size / 2;
    const circumference = radius * 2 * Math.PI;
    const halfSize = size / 2;

    // Simplify for View-based approach:
    // We use two proprietary semi-circles that rotate.
    // Note: Ensuring this works perfectly cross-platform is tricky with Views alone.
    // Simplified visual prop: 
    // If we want a perfect circle, we'll use a standard clever hack using border radii.

    // Since we can't use SVG easily, let's use a simpler clean ring with a static styled center for now,
    // or use a Propeller approach.
    // Propeller Approach:

    const rotateVal = Math.min(Math.max(progress, 0), 100) * 3.6;
    const isMoreThanHalf = progress > 50;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            {/* Background Ring */}
            <View style={[styles.ring, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: bgColor }]} />

            {/* Progress Slices - Simplified hack for reliability */}
            {/* For a robust solution without SVG, we often just show a text & ring. 
               But let's try the Half-Circle method. */}

            <View style={[styles.circleOverlay, { width: size, height: size }]}>
                {/* Right Half */}
                <View style={[styles.slice, { width: size, height: size, left: 0 }]}>
                    <View style={[styles.halfCircle, {
                        width: size, height: size,
                        borderRadius: size / 2,
                        borderWidth: strokeWidth,
                        borderColor: color,
                        transform: [{ rotate: isMoreThanHalf ? '180deg' : `${rotateVal}deg` }]
                    }]} />
                </View>

                {/* Left Half (only if > 50%) */}
                {isMoreThanHalf && (
                    <View style={[styles.slice, { width: size, height: size, left: 0, transform: [{ rotate: '180deg' }] }]}>
                        <View style={[styles.halfCircle, {
                            width: size, height: size,
                            borderRadius: size / 2,
                            borderWidth: strokeWidth,
                            borderColor: color,
                            transform: [{ rotate: `${rotateVal - 180}deg` }]
                        }]} />
                    </View>
                )}
            </View>

            {/* Inner Text */}
            <View style={styles.circleInner}>
                <Text style={styles.circleText}>{Math.round(progress)}%</Text>
                <Text style={styles.circleSubText}>Paid</Text>
            </View>
        </View>
    );
};

const FinancialStats = ({ userData }) => {
    // Safely parse values - handle both strings and numbers
    const parseAmount = (value) => {
        if (!value) return 0;
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
        }
        return 0;
    };

    const total = parseAmount(userData?.dashboard?.amount?.Total);
    const paid = parseAmount(userData?.dashboard?.amount?.Paid);


    return (
        <View style={styles.container}>
            {/* Hero Section */}
            {/* Hero Section: Premium Balance Card with Circular Progress */}
            <View style={styles.heroSection}>
                <View style={styles.contentRow}>
                    {/* Left Side: Stats */}
                    <View style={styles.leftColumn}>
                        <Text style={styles.cardLabel}>TOTAL FEES</Text>
                        <Text style={styles.heroAmount}>{userData?.dashboard?.amount?.Total || "$0"}</Text>

                        <View style={styles.miniStatsContainer}>
                            <View style={styles.miniStatItem}>
                                <View style={[styles.dot, { backgroundColor: '#4ade80' }]} />
                                <Text style={styles.miniLabel}>Paid</Text>
                                <Text style={[styles.miniValue, { color: '#4ade80' }]}>
                                    {userData?.dashboard?.amount?.Paid || "$0"}
                                </Text>
                            </View>
                            <View style={styles.miniStatItem}>
                                <View style={[styles.dot, { backgroundColor: '#f87171' }]} />
                                <Text style={styles.miniLabel}>Due</Text>
                                <Text style={[styles.miniValue, { color: '#f87171' }]}>
                                    {userData?.dashboard?.amount?.due || "$0"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Right Side: Circular Progress */}
                    <View style={styles.rightColumn}>
                        <CircularProgress
                            size={100}
                            strokeWidth={10}
                            progress={(parseAmount(userData?.dashboard?.amount?.Paid) / parseAmount(userData?.dashboard?.amount?.Total) * 100) || 0}
                            color="#4ade80"
                            bgColor="rgba(255,255,255,0.1)"
                        />
                    </View>
                </View>
            </View>

            {/* Sub Stats Grid */}
            <Text style={styles.sectionTitle}>Breakdown</Text>
            <View style={styles.grid}>
                <StatCard
                    title="Amount Paid"
                    value={userData?.dashboard?.amount?.Paid || "$0"}
                    color="#10b981"
                    icon="check-circle"
                    isHero={false}
                />
                <StatCard
                    title="Amount Due"
                    value={userData?.dashboard?.amount?.due || "$0"}
                    color="#ef4444"
                    icon="warning"
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
        marginTop: 8,
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftColumn: {
        flex: 1,
        paddingRight: 16,
    },
    rightColumn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardLabel: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    heroAmount: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0f172a',
        letterSpacing: -1,
        marginBottom: 16,
    },
    miniStatsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    miniStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    miniLabel: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: '600',
        marginRight: 4,
    },
    miniValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    // Circular Progress Styles
    ring: {
        position: 'absolute',
    },
    circleOverlay: {
        position: 'absolute',
    },
    slice: {
        position: 'absolute',
        top: 0,
        overflow: 'hidden',
    },
    halfCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    circleInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: '#0f172a',
        fontSize: 20,
        fontWeight: '800',
    },
    circleSubText: {
        color: '#94a3b8',
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '600',
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
        gap: 16,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statContent: {
        flex: 1,
    },
    statTitle: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    heroCard: {
        alignItems: 'stretch',
    },
    gridCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    heroValue: {
        fontSize: 36,
        marginTop: 4,
    }
});

export default FinancialStats;
