import firebase from "../../firebase/config";

export const addUser = async (uid, email, avatar) => {
  try {
    return await firebase
      .database()
      .ref("user/" + uid)
      .set({
        uid: uid,
        email: email,
        avatar: avatar,
      });
  } catch (error) {
    return error;
  }
};
