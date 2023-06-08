import { getAnalytics } from "firebase/analytics";
import firebase_app from "./config";

const analytics = getAnalytics(firebase_app);

export default analytics;
