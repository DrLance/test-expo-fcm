import React from 'react';
import { Text, View, Button, Vibration } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import GoogleAuth from '../components/GoogleAuth';

const PUSH_REGISTRATION_ENDPOINT = 'http://192.168.1.44:3000/token';
const MESSAGE_ENPOINT = 'http://192.168.1.44:3000/message';
const EXPO_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default class AppContainer extends React.Component {
	state = {
		expoPushToken: '',
		notification: {},
	};

	registerForPushNotificationsAsync = async () => {
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

			this.setState({ expoPushToken: token }, () => {
				console.log('====================================');
				console.log(token);
				console.log('====================================');
				return fetch(EXPO_ENDPOINT, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: {
							value: token,
						},
						user: {
							username: 'warly',
							name: 'Dan Ward',
						},
					}),
				});
			});
		} else {
			console.log('Must use physical device for Push Notifications');
		}
	};

	componentDidMount() {
		this.registerForPushNotificationsAsync();

		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
	}

	_handleNotification = notification => {
		Vibration.vibrate();
		this.setState({ notification: notification });
	};

	// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
	sendPushNotification = async () => {
		const message = {
			to: this.state.expoPushToken,
			sound: 'default',
			title: 'Original Title',
			body: 'And here is the body!',
			data: { data: 'goes here' },
		};

		const response = await fetch(EXPO_ENDPOINT, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
		const data = response._bodyInit;
		console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text>Origin: {this.state.notification.origin}</Text>
					<Text>Data1: {JSON.stringify(this.state.notification.data)}</Text>
				</View>
				<Button title={'Press to Send Notification'} onPress={() => this.sendPushNotification()} />
				<GoogleAuth />
                <Button title={'Open Drawer'} onPress={() => {this.props.navigation.openDrawer()}}/>
			</View>
		);
	}
}
