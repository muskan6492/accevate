import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform
} from 'react-native';
import { verifyOtp } from '../services/api';
import CustomModal from '../components/CustomModal';
import Icon from 'react-native-vector-icons/MaterialIcons';


const OtpScreen = ({ route, navigation }) => {
  const { userid } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    actions: []
  });

  const showModal = (title, message, actions = []) => {
    setModalConfig({ title, message, actions });
    setModalVisible(true);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (text && index === 5) {
        handleSubmit(newOtp.join(''));
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (Platform.OS === 'web') return;

    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (otpValue = otp.join('')) => {
    if (otpValue.length < 6) {
      showModal('Incomplete OTP', 'Please enter all 6 digits', [{ text: 'OK', onPress: () => setModalVisible(false) }]);
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);
    const result = await verifyOtp(userid, otpValue);
    setIsLoading(false);

    if (result.success) {
      navigation.navigate('Dashboard');
    } else {
      showModal('Verification Failed', result.message, [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
          }
        }
      ]);
    }
  };

  const handleResend = () => {
    showModal(
      'Resend OTP',
      `A new OTP has been sent to your registered contact for user: ${userid}`,
      [{ text: 'OK', onPress: () => setModalVisible(false), style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>📱</Text>
          </View>
        </View>

        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to your registered contact.
          Please enter it below to verify your identity.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpBox}>
              <TextInput
                ref={el => inputRefs.current[index] = el}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={index === 0}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={() => handleSubmit()}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>VERIFY OTP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
          <Text style={styles.resendText}>Didn't receive OTP? Resend</Text>
        </TouchableOpacity>

        <Text style={styles.useridText}>User ID: {userid}</Text>
      </View>

      {/* Custom Modal */}
      <CustomModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        actions={modalConfig.actions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    position: 'relative', // Context for absolute positioning
  },
  backButtonContainer: {
    padding: 8,
    position: 'absolute',
    left: 10,
    bottom: 12, // Align vertically with text roughly
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    paddingTop: 40,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#bfdbfe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    marginBottom: 45,
  },
  otpBox: {
    width: 52,
    height: 65,
    borderWidth: 2,
    borderColor: '#93c5fd',
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
  },
  otpInput: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    padding: 0,
  },
  button: {
    backgroundColor: '#1e3a8a',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  resendText: {
    color: '#3b82f6',
    fontSize: 16,
    marginTop: 25,
    fontWeight: '600',
  },
  useridText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 35,
    fontStyle: 'italic',
  },
});

export default OtpScreen;