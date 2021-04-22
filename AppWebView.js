import React, {Component} from 'react';
import { StyleSheet, View, Text} from "react-native";
import { WebView } from 'react-native-webview';

class AppWebView extends Component {
    render(){
        return (
            <View style={styles.container}>
                <WebView
                source={{uri: this.props.route.params}}
                style={{marginTop: 20}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center"
    }
});

export default AppWebView;