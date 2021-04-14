import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Alert} from "react-native";
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

const passwdGenerator = () =>{
    let passwd = Array(15).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+").map((x)=>{
        return x[Math.floor(Math.random()*(x.length))]
    }).join("")
    console.log(passwd)
    console.log(this)
    //this.setState({passwd: passwd});
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
            passwd: "",
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
                        value={data.item.key == "passwd" ? this.state.passwd: {}} 
                        onChangeText={(passwd) => {data.item.key == "passwd" ? this.setState({ passwd }): '' }}  />
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
        console.log(passwd)
        this.setState({passwd: passwd});
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
        console.log(item)
    }
    _onDeleteField(item){
        let selected = this.state.selected
        selected.push(item.item.key)
        this.setState({selected: selected});
    }
    _onAddPasswd(){

    }
    _onGoBack(){
        this.props.navigation.goBack();
    }
    componentDidMount(){
        
    }
    componentDidUpdate(){
        console.log(this.state);
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
                    <FlatList data={this.state.data} renderItem={this._renderItem.bind(this)} ></FlatList>
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