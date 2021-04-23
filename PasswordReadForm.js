import React, { Component} from "react";
import { StyleSheet, Text, View, FlatList, Alert, TextInput, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import _ from "underscore";

const Separator = () => (
    <View style={styles.separator} />
);

const PasswdViewToggle = (props) =>{
    return (
        <View style={styles.refresh}>
            <Icon style={styles.inputIcon} name={props.passwdVisible ? "eye-slash" : "eye"} size={24} color="gray" onPress={() => props.generator(props.passwd)}/>
            <Icon style={styles.inputIcon} name="history" size={23} color="gray" onPress={() => generator.generator()}/>
        </View>
    )
}

const GoWebSite = (props) =>{
    return (
        <View style={styles.refresh}>
            <Icon style={styles.inputIcon} name="paper-plane" size={23} color="gray" onPress={() => props.generator(props.url)} />
        </View>
    )
}

class PasswordReadForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [                
                {key: "title",     label:"제목",        value: ""},
                {key: "account",   label:"계정",        value: ""},
                {key: "userId",    label:"유저네임",    value: ""},
                {key: "passwd",    label:"패스워드",    value: ""},
                {key: "website",   label:"웹사이트",    value: ""},
                {key: "notice",    label:"노트",        value: ""}
            ],
            passwdVisible: false
        }

        this.props.navigation.addListener('focus', () => this._onLoad());
    }
    _renderItem = (data) =>{
        const {
            passwd, 
            passwdVisible} 
        = this.state;
        let passwdStyle = {}
        let hide = {}
        if(data.item.key == "passwd"){
            passwdStyle = {
                flex: 7
            }
        }

        if(data.item.value == ""){
            hide = {
                display: 'none'
            }
        }
        
        if(data.item.key == "title"){
            return(
                <View name={data.item.key} style={[styles.itemInput, hide]}></View>
            )
        }
        return (
            <View name={data.item.key} style={[styles.itemInput, hide]}>
                <View style={[styles.inputarea, passwdStyle]} >
                    <Text style={styles.inputtext}>{data.item.label}</Text>
                    <TouchableOpacity activeOpacity={1.0} onPress={()=> this.copyClipBoard(data.item.value)}>
                        <TextInput style={styles.input} secureTextEntry={data.item.key == "passwd" && !passwdVisible} editable={false}>{data.item.value}</TextInput>
                    </TouchableOpacity>
                </View>
                { data.item.key == "passwd"  ?  <PasswdViewToggle  passwd={data.item.value} passwdVisible={passwdVisible} generator={this.passwdViewGenerator} history={this.historyGenerator} />: <Separator/>}
                { data.item.key == "website" ? <GoWebSite url={data.item.value} generator={this.goWebView}/> : <Separator/>}
            </View>
        )
    }
    passwdViewGenerator = (passwd) =>{
        this.setState({passwdVisible: !this.state.passwdVisible})
    }
    historyGenerator = () =>{
        
    }
    goWebView = (url) =>{
        this.props.navigation.navigate("AppWebView", url)
    }
    copyClipBoard = (text) =>{
        Clipboard.setString(text)
        console.log(Clipboard.getString());
        Alert.alert("클립보드로 복사됨")
    }
     _onLoad(){
        var item = this.props.route.params;
        var state = _.map(this.state.data, function(v, i){
            v.value = item[v.key]
            return v;
        });
        //console.log(state)
        this.setState({data:state,...item});
     }
    _onContextMenu(item){
        console.log('contextMenu')
    }
    _onGoBack(){
        this.props.navigation.goBack();
    }
    componentDidMount(){
        let data = AsyncStorage.getItem('DATA');
        console.log(data)
    }
    componentDidUpdate(){
        //console.log(this.state);
    }
    render(){
        let {
            title
        }= this.state
        return (
            <MenuProvider>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.goback}><Text onPress={this._onGoBack.bind(this)}><Icon name="arrow-left" size={23} color="white" /></Text></View>
                        <View style={styles.titleArea}><Text style={styles.title}>{title}</Text></View>
                        <View style={styles.config}>
                            <Menu>
                                <MenuTrigger><Icon name="ellipsis-v" size={23} color="white" /></MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => alert(`Delete`)} text='삭제' />
                                    <MenuOption onSelect={() => alert(`Update`)} >
                                    <Text>편집</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={() => alert(`copy`)} text='복사본 만들기' />
                                    <MenuOption onSelect={() => alert(`share`)} text='공유' />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    <Separator />
                    <View style={styles.middle}>
                        <FlatList data={this.state.data} renderItem={this._renderItem.bind(this)} ></FlatList>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.updateInfo}>마지막 업데이트: 2021.4.22 오후6:00</Text>
                    </View>
                    <Separator />
                </View>
            </MenuProvider>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center"
    },
    top:{
        flex: 1.1,
        flexDirection: "row",
        backgroundColor: "#0b64ca",
        padding: 5,
        height: 10
    },
    middle:{
        flex: 16
    },
    bottom:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    goback:{
        flex: 2,
        padding: 10
    },
    titleArea:{
        flex: 12,
        paddingTop: 10
    },
    title:{
        fontSize: 17,
        color: "white"
    },
    config:{
        flex: 1,
        paddingTop: 10
    },
    gobackLabel:{
        color: "white",
        fontSize: 20,
        padding: 5
    },
    saveLabel:{
        color: "white",
        padding: 10
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
    input:{
        padding: 20,
        margin: 10,
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#b9b2b2"
    },
    inputtext:{
        padding: 20,
        marginBottom: -50,
        opacity: 0.5
    },
    itemInput:{
        flex:1,
        flexDirection: "row"
    },
    separator:{
        marginVertical: 8
    },
    inputarea:{
        flex: 6
    },
    refresh:{
        flex: 2,
        flexDirection: "row"        
    },
    iconarea:{
        flex: 1
    },
    inputIcon:{
        paddingTop: 40,
        paddingRight: 20
    },
    updateInfo:{
        opacity: 0.6,
        paddingRight: 30
    }
});

export default PasswordReadForm;