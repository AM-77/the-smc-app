import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import Background from '../components/Background';
import MembersList from '../components/MembersList';
import Toast from '../components/Toast';
import { getAllMembers } from '../api/members-api';

export default function DashboardScreen({ navigation }) {
  const [members, setMembers] = useState(null);
  const [toast, setToast] = useState({ value: '', type: '' });

  useEffect(() => {
    laodMembers();
  }, []);

  const laodMembers = () => {
    getAllMembers()
      .then((members) => setMembers(members))
      .catch((err) => {
        if (err.message) {
          setToast({ value: error.message, type: 'error' });
        }
      });
  };

  const createMember = () => navigation.navigate('CreateMemberScreen');

  const displayMember = (member) =>
    navigation.navigate('DisplayMemberScreen', { member });

  const editMember = (member) =>
    navigation.navigate('EditMemberScreen', { member });

  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Members</Text>
          <IconButton
            icon="account-plus-outline"
            color={theme.colors.primary}
            size={30}
            onPress={createMember}
          />
        </View>
        {members === null ? (
          <View style={styles.indecatorWrap}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : members.length === 0 ? (
          <Text style={styles.noMember}>No member was added yet.</Text>
        ) : (
          <MembersList
            members={members}
            displayMember={displayMember}
            editMember={editMember}
          />
        )}
      </View>
      <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.bgTransparent,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  indecatorWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMember: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginTop: 50,
  },
});
