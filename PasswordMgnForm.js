import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Separator = () => (
    <View style={styles.separator} />
);
const PasswdRfresh = () =>{
    return (
        <View style={styles.refresh}>
            <Icon style={styles.inputIcon} name="refresh" size={23} color="gray" />
        </View>
    )
}

class PasswordMgnForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [                
                {key: "title",  placeholder: "제목"},
                {key: "account",placeholder: "계정"},
                {key: "userId", placeholder: "유저네임"},
                {key: "passwd", placeholder: "패스워드"},
                {key: "website",placeholder: "웹사이트"},
                {key: "notice", placeholder: "노트"}
            ]
        }
    }
    _renderItem = data =>{
        let inputicon = "times-circle"
        let passwdStyle = {}
        if(data.item.key == "passwd"){
            passwdStyle = {
                flex: 5
            }
        }
        if(data.item.key == "title"){
            inputicon = "paint-brush"
        }
        return (
            <View style={styles.itemInput}>
                <View style={[styles.inputarea, passwdStyle]}>
                    <TextInput style={styles.input} placeholder={data.item.placeholder} name={data.item.key} />
                </View>
                { data.item.key == "passwd"  ?  <PasswdRfresh />: <Separator/>}
                <View style={styles.iconarea}>
                    <Icon style={styles.inputIcon} name={inputicon} size={23} color="gray" />
                </View>
            </View>
        )
    }
    _onAddPasswd(){

    }
    _onGoBack(){
        this.props.navigation.goBack();
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.goback}><Text onPress={this._onGoBack.bind(this)}><Icon name="times" size={23} color="white" /></Text></View>
                    <View style={styles.saveArea}><Text onPress={this._onAddPasswd.bind(this)} style={styles.saveLabel}>저장</Text></View>
                </View>
                <Separator />
                <View style={styles.middle}>
                    <FlatList data={this.state.data} renderItem={this._renderItem} ></FlatList>
                </View>
                <View style={styles.bottom}>
                    <Text style={[styles.button]} onPress={this._onAddPasswd.bind(this)}>추가</Text>
                </View>
                <Separator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center"
    },
    top:{
        flex: 1,
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
        justifyContent: "center"
    },
    goback:{
        flex: 6,
        padding: 8
    },
    saveArea:{
        flex: 1,
        fontSize: 15
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
        borderBottomWidth: 1,
        borderBottomColor: "#b9b2b2"
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
        flex: 1
    },
    iconarea:{
        flex: 1
    },
    inputIcon:{
        paddingTop: 40
    }
});

export default PasswordMgnForm;