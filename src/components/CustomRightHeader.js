import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const phoneWidth = Dimensions.get('screen').width;

export default function CustomRightHeader(props) {
    const navigation = useNavigation();

	return (
		<View style={styles.container}>			
			<View style={styles.content}>				
				<Button title={'Press Tab'} onPress={() => navigation.navigate('HomeStack2')} />
                <Button title={'Press Tab 2'} onPress={() => navigation.navigate('HomeStack')} />
				<Button title={'Press Tab 3'} onPress={() => navigation.navigate('Home')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	content: {
		flexDirection: 'row',
	},
});
