import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { theme } from '../core/theme';
import Toast from '../components/Toast';
import { deleteMember } from '../api/members-api';

export default function MembersList({ members, displayMember, editMember }) {
  const [deleting, setDeleting] = useState(false);
  const [membersList, setMembersList] = useState(members);
  const [toast, setToast] = useState({ value: '', type: '' });

  const removeMember = (member) =>
    Alert.alert(
      'Remove Member',
      `Are you sure you want to delete ${member.fullname}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            setDeleting(true);
            const response = await deleteMember(member.id);
            setDeleting(false);

            if (response.error) {
              setToast({
                type: 'error',
                message: response.error,
              });
            } else {
              const removedMember = membersList.filter(
                (mbr) => mbr.id !== member.id
              );
              setMembersList(removedMember);

              setToast({
                type: 'success',
                message: 'The member has been deleted.',
              });
            }
          },
        },
      ]
    );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {membersList &&
          membersList.map((member) => (
            <TouchableRipple
              style={styles.memberItemWrapper}
              key={member.serialnumber + Math.ceil(Math.random() * 100)}
              rippleColor={theme.colors.bgTransparent}
              onPress={() => displayMember(member)}
            >
              <View style={styles.memberItem}>
                <View style={styles.ppicWrap}>
                  <Image
                    style={styles.ppic}
                    source={
                      member.ppic
                        ? { uri: `data:image/jpeg;base64,${member.ppic}` }
                        : require('../assets/no-ppic.png')
                    }
                  />
                </View>
                <Text style={styles.fullname}>{member.fullname}</Text>
                <IconButton
                  icon="account-edit-outline"
                  color={theme.colors.green}
                  size={30}
                  onPress={() => editMember(member)}
                />
                <View style={styles.loaderWrap}>
                  {deleting ? (
                    <ActivityIndicator size="large" color={theme.colors.red} />
                  ) : (
                    <IconButton
                      icon="account-remove-outline"
                      color={theme.colors.red}
                      style={styles.deleteBtn}
                      size={30}
                      onPress={() => removeMember(member)}
                    />
                  )}
                </View>
              </View>
            </TouchableRipple>
          ))}
      </ScrollView>
      <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 20,
  },
  memberItemWrapper: {
    marginVertical: 10,
  },
  memberItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.colors.bgTransparent,
    borderRadius: 3,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  ppicWrap: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.bgTransparent,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 7,
  },
  ppic: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  fullname: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  loaderWrap: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  deleteBtn: {
    top: -15,
    left: -15,
  },
});
