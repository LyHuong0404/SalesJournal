import { Text, View, Pressable, ToastAndroid } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from '../../../actions/authActions';
GoogleSignin.configure({
    androidClientId: "189009872460-nscokuhej0rl0r7bmp88uvepju447b7k.apps.googleusercontent.com",
    iosClientId: "189009872460-ku6g1br9kvg4jv1hvl8hvfugk9goub9r.apps.googleusercontent.com",
    webClientId: "189009872460-90ubh2bch0p3i3cd0m94r9noep0hc6jt.apps.googleusercontent.com",
	scopes: ['profile', 'email'],
});

const loginGG = async () => {
	await GoogleSignin.hasPlayServices();
	const userInfo = await GoogleSignin.signIn();
	return userInfo;
};
//https://peerlist.io/blog/engineering/implementing-google-signin-in-react-native
export default function GoogleLogin(navigation) {
	const dispatch = useDispatch();
	const handleLogin = async(idToken) => {
        try {
            const notifyToken = await AsyncStorage.getItem('notifyToken')
            const response = await dispatch(login({ notifyToken, idToken, provider: 'GOOGLE' }));
            if (response) {      
                return response.payload;
            } else {
                ToastAndroid.show('Đăng nhập không thành công, vui lòng nhập lại!', ToastAndroid.SHORT);
            }
        } catch(err) {
            ToastAndroid.show('Đăng nhập không thành công, vui lòng nhập lại!', ToastAndroid.SHORT);
        }
    };

	const handleGoogleLogin = async () => {
		try {
			const response = await loginGG();
			const { idToken } = response;
			const data = await handleLogin(idToken);
			if (data?.user?.profile) {
				if (data?.roles?.some((item) => item == 'ROLE_ADMIN')) {
					navigation?.navigate('AdminNav');
				} else navigation?.navigate('VendorNav');              
			} else {
				navigation?.navigate('ProfileUser');              
			}
			if (idToken) {
			}
		} catch (apiError) {
		}
	};

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.signOut();
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }

	return (
		<View>
			<Pressable onPress={handleGoogleLogin}><Text>Continue with Google</Text></Pressable>
      		<Pressable onPress={handleGoogleLogout}><Text>Logout</Text></Pressable>
		</View>
	);
}