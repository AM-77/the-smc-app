import app from 'firebase/app';
import 'firebase/firestore';

export const getAllMembers = async () => {
  try {
    const snapshot = await app.firestore().collection('smc-members').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const getMemberBySerialNumber = async (sn) => {
  try {
    const snapshot = await app
      .firestore()
      .collection('smc-members')
      .where('serialnumber', '==', sn)
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const saveMember = async (member) => {
  try {
    await app.firestore().collection('smc-members').doc().set(member);
    return true;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const updateMember = async (id, member) => {
  try {
    await app.firestore().collection('smc-members').doc(id).set(member);
    return true;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const deleteMember = async (id) => {
  try {
    await app.firestore().collection('smc-members').doc(id).delete();
    return true;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
