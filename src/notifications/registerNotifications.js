import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export default async function registerForPushNotificationsAsync() {
	if (Constants.isDevice) {

		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
    }
    
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
    }
    
		let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    
		this.setState({ expoPushToken: token });
	} else {
		alert('Must use physical device for Push Notifications');
	}
}
