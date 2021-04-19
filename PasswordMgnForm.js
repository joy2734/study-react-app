import React, { Component, useState} from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from "underscore";

const Separator = () => (
    <View style={styles.separator} />
);

const PasswdRfresh = (generator) =>{
    return (
        <View style={styles.refresh}>
            <Icon style={styles.inputIcon} name="refresh" size={23} color="gray" onPress={() => generator.generator()}/>
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
            ],
            selected:[],
            title: "",
            account:"",
            userId: "",
            passwd: "",
            website: "",
            notice: "",
            autopass: false
        }
    }
    _renderItem = (data) =>{
        const {passwd} = this.state
        let inputicon = "times-circle"
        let passwdStyle = {}
        let hide = {}
        if(data.item.key == "passwd"){
            passwdStyle = {
                flex: 5
            }
        }
        if(data.item.key == "title"){
            inputicon = "paint-brush"
        }

       
        if(_.contains(this.state.selected, data.item.key)){
            hide = {
                display: 'none'
            }
        }

        return (
            <View name={data.item.key} style={[styles.itemInput, hide]}>
                <View style={[styles.inputarea, passwdStyle]}>
                    <TextInput style={styles.input} 
                        placeholder={data.item.placeholder} 
                        name={data.item.key} 
                        value={_.pick(this.state, data.item.key)[data.item.key]} 
                        onChangeText={(input) => { 
                            this.state[data.item.key] = input
                            this.setState(this.state)  
                        }}  /> 
                </View>
                { data.item.key == "passwd"  ?  <PasswdRfresh  generator={this.passwdGenerator} />: <Separator/>}
                <View style={styles.iconarea} >
                    <Icon title={data.item.key} onPress={() => this.createThreeButtonAlert(data)} style={styles.inputIcon} name={inputicon} size={23} color="gray" />
                </View>
            </View>
        )
    }
    passwdGenerator = () =>{
        let passwd = Array(15).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+").map((x)=>{
            return x[Math.floor(Math.random()*(x.length))]
        }).join("")
        //console.log(passwd)
        this.setState({passwd: passwd});
    }
    _itemAdd = () =>{
        console.log("아이템추가")
    }
    createThreeButtonAlert = (item) =>{
        if(item.item.key == "title"){
            this._onSelectTitleColor(item)
        }else{
            Alert.alert(
                "해당 필드를 삭제하시겠습니까?",
                "",
                [
                  {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "삭제", onPress: () => this._onDeleteField(item) }
                ]
            );
        }
    }
    _onSelectTitleColor(item){

    }
    _onDeleteField(item){
        let selected = this.state.selected
        selected.push(item.item.key)
        this.setState({selected: selected});
    }
    _onAddPasswd(item){
        AsyncStorage.getItem('DATA')
        .then((resp) =>{
            return JSON.parse(resp);
        })
        .then((parseResp) =>{
            let data;
            if(_.compact(_.values(item)).length < 6){
                console.log("requried field")
                Alert.alert("필드값을 모두 입력해주세요.")    
            }else{
                var firstData = !_.isObject(parseResp);
                if(firstData){ 
                    data = [_.pick(item, "title","account","userId","passwd","website","notice")];
                }else{
                    console.log(parseResp)
                    parseResp.push(_.pick(item, "title","account","userId","passwd","website","notice"));
                }
                AsyncStorage.setItem('DATA', JSON.stringify(firstData ? data : parseResp));
                Alert.alert("저장되었습니다.");
            }
            this.props.navigation.goBack();  
        })
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
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.goback}><Text onPress={this._onGoBack.bind(this)}><Icon name="times" size={23} color="white" /></Text></View>
                    <View style={styles.saveArea}><Text onPress={() =>{this._onAddPasswd(this.state)}} style={styles.saveLabel}>저장</Text></View>
                </View>
                <Separator />
                <View style={styles.middle}>
                    <FlatList data={this.state.data} renderItem={this._renderItem.bind(this)} ></FlatList>
                </View>
                <View style={styles.bottom}>
                    <Text style={[styles.button]} onPress={this._itemAdd.bind(this)}>추가</Text>
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