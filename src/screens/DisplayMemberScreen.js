import React from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { theme } from '../core/theme';
import Background from '../components/Background';
import BackButton from '../components/BackButton';

export default function DisplayMemberScreen({ route, navigation }) {
  const {
    params: { member },
  } = route;

  const {
    ppic,
    fullname,
    bdate,
    email,
    phone,
    committee,
    edate,
    serialnumber,
  } = member;

  return (
    <Background pdg={0}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View style={styles.ppicWrap}>
              <Image
                style={styles.ppic}
                source={
                  ppic
                    ? { uri: `data:image/jpeg;base64,${ppic}` }
                    : require('../assets/no-ppic.png')
                }
              />
            </View>
            <Text style={styles.fullname}>{fullname}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.row}>
              <Text style={styles.title}>Birth Date: </Text>
              <Text style={styles.value}>
                {moment(new Date(bdate)).format('YYYY-MM-DD')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Email Address: </Text>
              <Text style={styles.value}>{email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Phone: </Text>
              <Text style={styles.value}>{phone}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Committee: </Text>
              <Text style={styles.value}>{committee}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Engagement Date: </Text>
              <View style={styles.valueEdate}>
                <Text style={styles.value}>
                  {moment(new Date(edate)).format('YYYY-MM-DD')}
                </Text>
                <Text style={styles.subvalue}>
                  [{moment(new Date(edate)).fromNow()}]
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Serial Number: </Text>
              <Text style={styles.value}>{serialnumber}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.bgTransparent,
    paddingBottom: 25,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  fullname: {
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  row: {
    flex: 1,
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  ppicWrap: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 50,
  },
  ppic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: theme.colors.bgTransparent,
  },
  infoWrapper: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    marginBottom: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueEdate: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subvalue: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 10,
    marginBottom: 1,
  },
});
