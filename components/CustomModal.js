import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';

const CustomModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.cardContainer}>
        <View style={styles.cardModal}>
          <View style={styles.topTriangle} />
          {children}
          <View style={styles.bottomTriangle} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardModal: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  topTriangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '180deg' }],
  },
  bottomTriangle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 15,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'transparent',
  },
});

export default CustomModal;
