import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomModal = ({ visible, title, message, actions = [] }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          
          <View style={[styles.actionsContainer, actions.length > 2 ? styles.actionsVertical : styles.actionsHorizontal]}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  action.style === 'destructive' ? styles.buttonDestructive : styles.buttonDefault,
                  actions.length > 2 ? styles.buttonFullWidth : { flex: 1, marginHorizontal: 5 }
                ]}
                onPress={action.onPress}
              >
                <Text
                  style={[
                    styles.buttonText,
                    action.style === 'destructive' ? styles.textDestructive : styles.textDefault
                  ]}
                >
                  {action.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1e293b',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  actionsContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  actionsHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionsVertical: {
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDefault: {
    backgroundColor: '#1e3a8a',
  },
  buttonDestructive: {
    backgroundColor: '#fee2e2',
  },
  buttonFullWidth: {
    width: '100%',
    marginBottom: 10,
  },
  textDefault: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  textDestructive: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomModal;
