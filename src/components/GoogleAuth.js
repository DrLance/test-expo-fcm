import React from 'react';
import { Text, View, Button, Vibration } from 'react-native';
import { Notifications } from 'expo';


export default class GoogleAuth extends Component {
    state = { token: null }

    render() {
        return (
            <Button>Google Sign In</Button>            
        );
    }
}