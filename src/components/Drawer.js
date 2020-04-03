import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		marginTop: 70,
		paddingLeft: 30,
		paddingRight: 30,
	},
});

function CustomDrawerContent(props) {	
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text>Custom Category1</Text>
				<Button title={'Go To Tabs'} onPress={() => props.navigation.navigate('Tabs')} />
			</View>
		</View>
	);
}

export default CustomDrawerContent;
