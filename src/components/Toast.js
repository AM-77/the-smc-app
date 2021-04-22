import React from 'react';
import { Snackbar } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../core/theme';

export default function Toast({ type = 'error', message, onDismiss }) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        onDismiss={onDismiss}
        style={{
          backgroundColor:
            type === 'error'
              ? theme.colors.error
              : type === 'success'
              ? theme.colors.success
              : '#00000000',
        }}
      >
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    width: '100%',
  },
  content: {
    fontWeight: '500',
  },
});
