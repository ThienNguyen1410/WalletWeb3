import firebase from "../../firebase/config";
const signOutRequest = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
};

export default signOutRequest;
