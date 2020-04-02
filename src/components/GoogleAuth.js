import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import SvgUri from 'expo-svg-uri';

export default class GoogleAuth extends React.Component {
	state = { token: null, user: null };

	initAsync = async () => {
		await GoogleSignIn.initAsync({
			clientId: '38615240892-1uugspv3np41nq9vemrcd5mou54b6ccd.apps.googleusercontent.com',
		});
	};

	_syncUserWithStateAsync = async () => {
		const user = await GoogleSignIn.signInSilentlyAsync();

		this.setState({ user });		
	};

	signOutAsync = async () => {
		await GoogleSignIn.signOutAsync();
		this.setState({ user: null });
	};

	askGoogle = async () => {
		this.initAsync();
		try {
			await GoogleSignIn.askForPlayServicesAsync();
			
			const { type, user } = await GoogleSignIn.signInAsync();

			if (type === 'success') {
				this._syncUserWithStateAsync();
			}
		} catch ({ message }) {
			alert('login: Error:' + message);
		}
	};

	render() {
		return (
			<View style={styles.backImg}>
				<SvgUri fill="#00ff00ff" width="50" source={require('../../assets/instagram.svg')} />
				<Button title={'Google Auth'} onPress={this.askGoogle} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	backImg: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
