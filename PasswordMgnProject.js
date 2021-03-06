import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button} from "react-native";
import PasswordInputText from 'react-native-hide-show-password-input';
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { parse } from "@babel/core";

const Separator = () => (
    <View style={styles.separator} />
  );

class PasswordMgnProject extends Component{
    constructor(props){
        super(props)
        this.state = {
            isPassword: false,
            isNew : true,
            passwd: '',
            passwd1: '',
            nameError: '',
            nameError1: ''
        };
        
        this.props.navigation.addListener('focus', () => this._onLoad(this.state));
    }
    _onFAQPress(){

    }
    _onLoad(state){
        AsyncStorage.getItem('password')
        .then((resp) =>{
            return JSON.parse(resp);
        })
        .then((parseResp) =>{
            if(parseResp){
                this.setState({isNew: false, passwd: ''});
            }
        });
    }
    _onPress(){
        AsyncStorage.getItem('password')
        .then((passwd) =>{
            if(this.state.passwd == ""){
                this.setState({nameError: '패스워드를 입력해주세요.'})
            }else if(passwd != this.state.passwd){
                console.log(this.state.passwd)
                this.setState({nameError: '패스워드가 일치하지 않습니다.'})
            }else{
                this.props.navigation.navigate("PasswordListMenu")
                this.setState({isNew: false, passwd: '', nameError: ''});
                this.input.clear()
            }
        });
    }
    _onRegister(state){
        let component = this;
        let errorVal = {nameError: '', nameError1: ''};
        if(state.passwd == "" || state.passwd1 == ""){
            errorVal.nameError = '패스워드를 입력해주세요.'
        }else{
            if(state.passwd == state.passwd1){
                AsyncStorage.setItem('password', state.passwd)
                .then(()=>{
                    component.setState({isNew: false, passwd: '', passwd1: '', nameError: ''});
                    alert('등록되었습니다.')
                })
            }else{
                errorVal.nameError1 = '패스워드가 일치하지 않습니다.'
            }
        }
        console.log(errorVal)
        this.setState(errorVal)
        //});
    }
    componentDidMount(){
        //AsyncStorage.removeItem('password')
        //AsyncStorage.removeItem('DATA')
        this._onLoad();
    }
    render(){
        const {passwd, 
            passwd1, 
            isNew,
            nameError,
            nameError1,
            isPassword} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.topLabels}>My Passwords</Text>
                {isNew ?
                    <View>
                        <Text style={styles.guideText}>어서 오십시오.</Text>
                        <Text style={[styles.guideText, {fontSize: 13, borderBottomWidth: 0}]}>앱을 시작하려면 마스터 패스워드를 등록하십시오. 동기화 옵션이 없으므로 마스터 패스워드를 분실하면 저장된 데이터를 되살릴 수 없습니다. 주기적으로 데이터를 반드시 백업하시기 바랍니다.</Text>
                        <View style={{margin: 30}}>
                            <View style={styles.passwd1}>
                                <TextInput
                                    placeholder="패스워드"
                                    style={[styles.input, {marginBottom: 10, width: 250}]}
                                    getRef={input => this.input = input}
                                    value={passwd}
                                    secureTextEntry={isPassword}
                                    onChangeText={(passwd) => this.setState({ passwd})}
                                    iconSize={30} 
                                />
                                <Icon style={styles.inputIcon} name={isPassword ?  "eye-slash" : "eye"} size={24} color="black" onPress={() => this.setState({isPassword: !isPassword})}/>
                            </View>
                            <View>
                                {nameError && !passwd ? <Text style={{ color: "red", marginBottom: 10 }}>{this.state.nameError}</Text>:<Text></Text>}
                            </View>
                            <View style={styles.passwd2}>
                                <TextInput
                                    placeholder="패스워드"
                                    style={[styles.input, {marginBottom: 10, width: 250}]}
                                    getRef={input => this.input = input}
                                    value={passwd1}
                                    secureTextEntry={isPassword}
                                    onChangeText={(passwd1) => this.setState({ passwd1})}
                                    iconSize={0} 
                                />
                            </View>
                            <View>
                                {nameError1 ? <Text style={{ color: "red", marginBottom: 10 }}>{this.state.nameError1}</Text>:<Text></Text>}
                                {nameError && !passwd1? <Text style={{ color: "red", marginBottom: 10 }}>{this.state.nameError}</Text>:<Text></Text>}
                            </View>
                        </View>
                    </View>
                :
                <View>
                    <Text style={styles.guideText}>통합 패스워드를 입력해주세요.</Text>
                    <View style={{ margin: 30, marginTop: 0}}>
                        <PasswordInputText
                            style={{marginBottom: 0}}
                            getRef={input => this.input = input}
                            value={passwd}
                            onChangeText={(passwd) => {this.setState({ passwd })}}
                            iconSize={30} 
                        />
                        {nameError ? <Text style={{ color: "red", marginBottom: 10 }}>{this.state.nameError}</Text>:<Text></Text>}
                        <Button
                            title="Clear"
                            onPress={() => this.input.clear()} />
                    </View>
                </View>}

                <View style={styles.fixToText}>
                    <Text style={[styles.button, styles.faq]} onPress={this._onFAQPress.bind(this)}>FAQ</Text>
                    {isNew ?<Text style={[styles.button]} onPress={()=>{this._onRegister(this.state)}}>등록</Text>:  <Text style={[styles.button]} onPress={this._onPress.bind(this)}>입력</Text>}
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
    warnig:{
        position: 'absolute',
        left: 250,
        top: 34,
        zIndex: 2000
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
    input:{
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#b9b2b2"
    },
    passwd1:{
        flexDirection: "row"
    },
    passwd2:{
        flexDirection: "row"
    },
    inputIcon:{
        paddingTop: 15
    }
});

export default PasswordMgnProject;