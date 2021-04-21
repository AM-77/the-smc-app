import app from 'firebase/app';
import 'firebase/auth';

export const logoutUser = () => {
  app.auth().signOut();
};

export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    app.auth().currentUser.updateProfile({
      displayName: name,
    });
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await app.auth().signInWithEmailAndPassword(email, password);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await app.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
