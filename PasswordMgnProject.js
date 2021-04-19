import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Button} from "react-native";
import PasswordInputText from 'react-native-hide-show-password-input';
import AsyncStorage from "@react-native-community/async-storage";

const Separator = () => (
    <View style={styles.separator} />
  );

class PasswordMgnProject extends Component{
    constructor(props){
        super(props)
        this.state = {
            password: ''
        };
    }
    _handleTextChange = event =>{
        this.setState({ zip: event.nativeEvent.text });
    }
    _onFAQPress(){

    }
    _onPress(){
        this.props.navigation.navigate("PasswordListMenu")
    }
    componentDidMount(){
        //AsyncStorage.removeItem('DATA');
    }
    render(){
        const {password} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.topLabels}>My Passwords</Text>
                <Text style={styles.guideText}>통합 패스워드를 입력해주세요.</Text>
                <View style={{ margin: 30, marginTop: 0}}>
                    <PasswordInputText
                        getRef={input => this.input = input}
                        value={password}
                        onChangeText={(password) => this.setState({ password })}
                        iconSize={30}
                    />
                    <Button
                        title="Clear"
                        onPress={() => this.input.clear()} />
                </View>
                <View style={styles.fixToText}>
                    <Text style={[styles.button, styles.faq]} onPress={this._onFAQPress.bind(this)}>FAQ</Text>
                    <Text style={[styles.button]} onPress={this._onPress.bind(this)}>입력</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    fixToText: {
        width: 170,
        marginLeft: 110,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topLabels:{
        backgroundColor: "#0b64ca",
        borderColor: "#0b64ca",
        borderWidth: 1,
        textAlign: 'left',
        padding: 10,
        fontSize: 20,
        color: "white"
    },
    button:{
        color: 'white',
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'center',
        borderRadius: 2,
        borderWidth:1,
        borderColor: '#0b64ca',
        backgroundColor:'#0b64ca',
        width: 80,
        height: 30
    },
    faq:{
        color: '#0b64ca',
        backgroundColor:'white'
    },
    guideText:{
        width: 300,
        borderBottomColor: '#c7c7c7',
        opacity: 0.4,
        borderBottomWidth: 1,
        paddingTop: 20,
        marginLeft: 30
    },
    separator:{
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },
});

export default PasswordMgnProject;