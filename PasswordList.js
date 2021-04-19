import React, { Component} from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-community/async-storage";

const Separator = () => (
    <View style={styles.separator} />
  );

class PasswordList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [

            ]
        }

        // 가상데이터
        // {title: "구글", userId:"wngurwnd12", createDt: "2010-10-19"},
        // {title: "네이버", userId:"hjjoo", createDt: "2011-11-20"},
        // {title: "네이트", userId:"sometales", createDt: "2020-03-03"} 
    }
    _renderItem = data =>{
        return (
            <View style={styles.passItem}>
                <View style={styles.shortcut}><Text style={styles.shortText}>A</Text></View>
                <View style={styles.info}>
                    <View><Text style={styles.title}>{data.item.title}</Text></View>
                    <View><Text style={styles.userInfo}>{data.item.userId}</Text></View>
                </View>{/* title/userid */}
                <View style={styles.date}><Text style={styles.dateInfo}>{data.item.createDt}</Text></View>
            </View>
        )
    }
    componentDidMount(){
        let data = AsyncStorage.getItem('DATA')
        .then((resp) =>{
            return JSON.parse(resp);
        })
        .then((parseResp) =>{
            if(parseResp){
                //로드
            }
            console.log(parseResp);
        })
    }
    _onPress(){
        this.props.navigation.navigate("PasswordMgnForm")
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.config}><Icon name="align-justify" size={23} color="white" /></View>
                    <View style={styles.topLabel}><Text style={styles.passwdLabel}>모두</Text></View>
                    <View style={styles.scope}><Icon name="search" size={23} color="white" /></View>
                    <View style={styles.pro}><Text style={styles.proLabel}>PRO</Text></View>
                    <View style={styles.config}><Icon name="ellipsis-v" size={23} color="white" /></View>
                </View>
                <View style={styles.middle}>
                    <FlatList data={this.state.data} renderItem={this._renderItem} ></FlatList>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.plusIcon}><Text onPress={this._onPress.bind(this)}><Icon name="plus" size={40} color="#900" /></Text></View>
                </View>
                <Separator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    },
    top:{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#0b64ca",
        padding: 10,
        paddingRight: 0
    },
    middle:{
        flex: 22
    },
    bottom:{
        flex: 3
    },
    config:{
        flex: 1,
        paddingTop: 2
    },
    topLabel:{
        flex: 9,
    },
    passwdLabel:{
        textAlign: "left",
        paddingLeft : 20,
        fontSize: 19,
        color: "white"
    },
    pro:{
        flex: 2,
        paddingLeft:10
    },
    proLabel:{
        fontSize: 19,
        color: "white"
    },
    scope:{
        flex: 1
    },
    plusIcon:{
        alignItems: "flex-end",
        paddingRight: 15
    },
    separator:{
        marginVertical: 15
    },
    passItem:{
        flex: 3,
        flexDirection: "row",
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    shortcut:{
        flex: 3,
        padding:5
    },
    shortText:{
        textAlign: "center",
        padding: 15,
        margin: 5,
        backgroundColor: "#0b64ca",
        color: "white",
        borderRadius: 25
    }, 
    info:{
        flex: 10,
        padding:10,
        flexDirection: "column"
    },
    title:{
        flex: 1,
        color: "gray",
        fontSize: 20
    },
    userInfo:{
        flex: 1,
        color: "gray"
    },
    date:{
        flex: 4,
        padding:10
    },
    dateInfo:{
        color: "gray"
    }
});

export default PasswordList;