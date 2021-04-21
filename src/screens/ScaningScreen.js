import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { getMemberBySerialNumber } from '../api/members-api';
import { theme } from '../core/theme';

export default function ScaningScreen({ navigation }) {
  const [hasScanPermission, setScanPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setScanPermission(status === 'granted');
    })();
  }, []);

  const onBarCodeScanned = ({ type, data }) => {
    if (data !== lastScanned) {
      setLastScanned(data);
      setNotFound(false);
    }
  };

  useEffect(() => {
    if (lastScanned) {
      setLoading(true);
      (async () => {
        const member = await getMemberBySerialNumber(lastScanned);
        setLoading(false);
        if (member) {
          navigation.navigate('DisplayMemberScreen', { member });
        } else {
          setNotFound(true);
        }
        setLastScanned(null);
      })();
    }
  }, [lastScanned]);

  return (
    <Background pdg={0}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Scan QR Code</Text>
        </View>
        <View style={styles.content}>
          {hasScanPermission === null ? (
            <Text>Requesting for scan permission</Text>
          ) : hasScanPermission === false ? (
            <Text style={{ color: '#fff' }}>
              Scan permission is not granted
            </Text>
          ) : loading ? (
            <View style={styles.indecatorWrap}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <View style={styles.subcontainer}>
              <Text style={styles.subtitle}>
                Place the QR Code in the center
              </Text>
              <View style={styles.barCodeScannerWrap}>
                <BarCodeScanner
                  onBarCodeScanned={onBarCodeScanned}
                  style={styles.barCodeScanner}
                />
              </View>
            </View>
          )}
        </View>
        {notFound && (
          <Paragraph>No member was found for the scaned QR Code.</Paragraph>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 25,
    paddingVertical: 19,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.bgTransparent,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  barCodeScannerWrap: {
    alignItems: 'center',
    height: 400,
    width: 400,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barCodeScanner: {
    height: 400,
    width: 600,
  },
  subcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.colors.primary,
  },
  indecatorWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
