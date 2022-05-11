import { auth } from "../../firebase/config";
const signInRequest = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
};

export default signInRequest;
