import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../components/CustomModal';
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async () => {
    if (!userid.trim()) {
      showModal('Validation Error', 'Please enter User ID', [{ text: 'OK', onPress: () => setModalVisible(false) }]);
      return;
    }
    if (!password.trim()) {
      showModal('Validation Error', 'Please enter Password', [{ text: 'OK', onPress: () => setModalVisible(false) }]);
      return;
    }

    setIsLoading(true);
    const result = await login(userid.trim(), password);
    setIsLoading(false);

    if (result.success) {
      showModal('Success', 'OTP sent to your registered contact', [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            navigation.navigate('Otp', { userid: result.userid });
          }
        }
      ]);
    } else {
      showModal('Login Failed', result.message, [{ text: 'OK', onPress: () => setModalVisible(false) }]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/applogo.png')}
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
          </View>
          <Text style={styles.appName}>Secure App</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>User Login</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>User ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your User ID"
                placeholderTextColor="#999"
                value={userid}
                onChangeText={setUserid}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => { /* Focus password */ }}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#64748b"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Secure Application</Text>
      </ScrollView>

      {/* Custom Modal */}
      <CustomModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        actions={modalConfig.actions}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 36,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 35,
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    paddingHorizontal: 18,
    backgroundColor: '#f8fafc',
    height: 56,
  },
  input: {
    fontSize: 17,
    color: '#1e293b',
    padding: 0,
  },
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 22,
    color: '#64748b',
  },
  button: {
    backgroundColor: '#1e3a8a',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  footer: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
    marginTop: 30,
    paddingBottom: 20,
  },
});

export default LoginScreen;