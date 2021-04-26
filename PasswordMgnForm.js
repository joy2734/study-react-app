import React, { Component} from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Alert, Modal, Pressable} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import _, { object } from "underscore";

const convertDate = (date) =>{
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);  
};

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
            required:["title"],
            nameErrorList: [],
            title: "",
            account:"",
            userId: "",
            passwd: "",
            website: "",
            notice: "",
            objectId: 0,
            modalVisible: false,
            isEdit: false,
            autopass: false,
            nameError: null
        }
        if(this.props.route.params){
            console.log(this.props.route.params)
            _.extend(this.state ,this.props.route.params)
        }
    }
    _renderItem = (data) =>{
        const {passwd, nameErrorList, nameError, modalVisible} = this.state
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
                        }}/>
                    {nameError && _.contains(nameErrorList, data.item.key) && <Text style={{ color: "red", marginLeft: 30 }}>{this.state.nameError}</Text>}
                </View>
                { data.item.key == "passwd"  ?  <PasswdRfresh  generator={this.passwdGenerator} />: <Separator/>}
                <View style={styles.iconarea} >
                    <Icon title={data.item.key} onPress={() => data.item.key == "title" ? this.setState({modalVisible:!modalVisible}) : this.createThreeButtonAlert(data)} style={styles.inputIcon} name={inputicon} size={23} color="gray" />
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
    selectBackground = (item) =>{
        //console.log(item)

    }
    _onSelectTitleColor(item){
        console.log('_onSelectTitleColor')
    }
    _onDeleteField(item){
        let selected = this.state.selected
        selected.push(item.item.key)
        this.setState({selected: selected});
    }
    _onAddPasswd(item){
        var validList = this.isValid(item);

        if(validList.length == 0){
            AsyncStorage.getItem('DATA')
            .then((resp) =>{
                return JSON.parse(resp);
            })
            .then((parseResp) =>{
                let data;
                var firstData = !_.isObject(parseResp);
                item = _.pick(item, "title","account","userId","passwd","website","notice", "objectId");
                item["createDt"] = convertDate(new Date());

                if(this.state.isEdit){
                    console.log(item.objectId, parseResp)
                    var found = parseResp.findIndex((passwd)=> passwd.objectId == item.objectId);
                    parseResp[found] = _.extend(parseResp[found], item);
                    AsyncStorage.setItem('DATA', JSON.stringify(parseResp));
                    Alert.alert("수정되었습니다.");
                    this.props.navigation.navigate("PasswordListMenu");
                }else{                    
                    AsyncStorage.getItem('objectId')
                    .then((objectId)=>{
                        item['objectId'] = objectId ? ++objectId : 1;
                        if(firstData){    
                            data = [item];
                        }else{
                            parseResp.push(item);
                        }
                        console.log(item["objectId"])
                        AsyncStorage.setItem('objectId', JSON.stringify(item["objectId"]))
                        .then(()=>{
                            AsyncStorage.setItem('DATA', JSON.stringify(firstData ? data : parseResp));
                            Alert.alert("저장되었습니다.");
                            this.props.navigation.navigate("PasswordListMenu");
                        });
                    });
                }


            })
        }else{
            this.setState({ nameError: "필수 항목 입니다.", nameErrorList: validList});
        }
    }
    isValid(item){
        return _.compact(_.map(this.state.required, (v, i)=>{
            if(item[v] == "")
                return v
        }));
    }
    _onGoBack(){
        this.props.navigation.goBack();
    }
    componentDidMount(){
        let data = AsyncStorage.getItem('DATA');
        //console.log(data)
        console.log(AsyncStorage.getItem('objectId'));
    }
    componentDidUpdate(){
    }
    render(){
        var {
            modalVisible
        } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.goback}><Text onPress={this._onGoBack.bind(this)}><Icon name="arrow-left" size={23} color="white" /></Text></View>
                    <View style={styles.saveArea}><Text onPress={() =>{this._onAddPasswd(this.state)}} style={styles.saveLabel}>저장</Text></View>
                </View>
                <Separator />
                <View style={styles.middle}>
                    <FlatList data={this.state.data} renderItem={this._renderItem.bind(this)} ></FlatList>
                </View>
                <View style={styles.bottom}>
                    <Text style={[styles.button]} onPress={this._itemAdd.bind(this)}>추가</Text>
                </View>


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({modalVisible:!modalVisible})
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                            style={[styles.mbutton, styles.buttonClose]}
                            onPress={() => this.setState({modalVisible:!modalVisible})}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                </View>
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
        flexDirection: "row",
        backgroundColor: "#0b64ca",
        padding: 5,
        height: 50
    },
    middle:{
        flex: 12
    },
    bottom:{
        flex: 2,
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
    },
    ///modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      mbutton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default PasswordMgnForm;