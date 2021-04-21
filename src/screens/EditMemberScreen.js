import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import TextInput from '../components/TextInput';
import PpicPicker from '../components/PpicPicker';
import Toast from '../components/Toast';
import { updateMember } from '../api/members-api';
import {
  emailValidator,
  nameValidator,
  committeeValidator,
  phoneValidator,
  serialnumberValidator,
  dateValidator,
} from '../helpers';

export default function EditMemberScreen({ route, navigation }) {
  const {
    params: { member },
  } = route;

  const [ppic, setPpic] = useState(member.ppic);
  const [fullname, setFullName] = useState({
    value: member.fullname,
    error: '',
  });
  const [email, setEmail] = useState({ value: member.email, error: '' });
  const [phone, setPhone] = useState({ value: member.phone, error: '' });
  const [committee, setCommittee] = useState({
    value: member.committee,
    error: '',
  });
  const [serialnumber, setSerialnumber] = useState({
    value: member.serialnumber,
    error: '',
  });
  const [bdate, setBdate] = useState({ value: member.bdate, error: '' });
  const [edate, setEdate] = useState({ value: member.edate, error: '' });

  const [loading, setLoading] = useState();
  const [toast, setToast] = useState({ value: '', type: '' });

  const onUpdateMember = async () => {
    const fullNameError = nameValidator(fullname.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    const committeeError = committeeValidator(committee.value);
    const serialnumberError = serialnumberValidator(serialnumber.value);
    const bdateError = dateValidator(bdate.value);
    const edateError = dateValidator(edate.value);

    if (
      fullNameError ||
      emailError ||
      phoneError ||
      committeeError ||
      serialnumberError ||
      bdateError ||
      edateError
    ) {
      setFullName({ ...fullname, error: fullNameError });
      setEmail({ ...email, error: emailError });
      setPhone({ ...phone, error: phoneError });
      setCommittee({ ...committee, error: committeeError });
      setSerialnumber({ ...serialnumber, error: serialnumberError });
      setBdate({ ...bdate, error: bdateError });
      setEdate({ ...edate, error: edateError });

      return;
    }
    setLoading(true);

    const updatedMember = {
      ppic,
      fullname: fullname.value,
      email: email.value,
      phone: phone.value,
      committee: committee.value,
      serialnumber: serialnumber.value,
      bdate: bdate.value,
      edate: edate.value,
    };

    const response = await updateMember(member.id, updatedMember);

    if (response.error) {
      setToast({
        type: 'error',
        message: response.error,
      });
    } else {
      setToast({
        type: 'success',
        message: 'The member has been updated.',
      });
    }
    setLoading(false);
  };

  return (
    <Background pdg={0}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit A Member</Text>
        </View>
        <ScrollView style={styles.scrollView} behavior="padding">
          <PpicPicker setPpic={setPpic} ppic={ppic} />

          <TextInput
            label="Full Name"
            returnKeyType="next"
            value={fullname.value}
            onChangeText={(text) => setFullName({ value: text, error: '' })}
            error={!!fullname.error}
            errorText={fullname.error}
          />

          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Phone"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
          />

          <TextInput
            label="Committee"
            returnKeyType="next"
            value={committee.value}
            onChangeText={(text) => setCommittee({ value: text, error: '' })}
            error={!!committee.error}
            errorText={committee.error}
          />

          <TextInput
            label="Birthdate"
            returnKeyType="next"
            value={bdate.value}
            onChangeText={(text) => setBdate({ value: text, error: '' })}
            error={!!bdate.error}
            errorText={bdate.error}
          />

          <TextInput
            label="Engagement Date"
            returnKeyType="next"
            value={edate.value}
            onChangeText={(text) => setEdate({ value: text, error: '' })}
            error={!!edate.error}
            errorText={edate.error}
          />

          <TextInput
            label="Serial Number"
            returnKeyType="next"
            value={serialnumber.value}
            onChangeText={(text) => setSerialnumber({ value: text, error: '' })}
            error={!!serialnumber.error}
            errorText={serialnumber.error}
          />

          <Button
            loading={loading}
            mode="contained"
            onPress={onUpdateMember}
            style={styles.saveBtn}
          >
            Update Member
          </Button>
        </ScrollView>
        <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
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
  scrollView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  saveBtn: {
    marginVertical: 24,
  },
});
