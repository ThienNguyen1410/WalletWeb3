import firebase from "../../firebase/config";
import { auth } from "../../firebase/config";
const signUpRequest = async (email, password) => {
    try {
        return await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
};

export default signUpRequest;
