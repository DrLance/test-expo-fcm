import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppMain from '../screens/Main';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Root() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={AppMain} />
		</Stack.Navigator>
	);
}

function Tabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={AppMain} />
            <Tab.Screen name="Home1" component={AppMain} />
            <Tab.Screen name="Home2" component={AppMain} />
            <Tab.Screen name="Home3" component={AppMain} />
		</Tab.Navigator>
	);
}

export default class Router extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<Drawer.Navigator drawerPosition={'right'} drawerType={'front'} edgeWidth={0}>
					<Drawer.Screen name="Root" component={Root} />
					<Drawer.Screen name="Tabs" component={Tabs} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
	}
}
