import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";

class SimpleList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [
                { key: "a"},
                { key: "b"},
                { key: "c"},
                { key: "d"},
                { key: "e"},
                { key: "f"},
                { key: "g"},
                { key: "h"},
                { key: "i"},
                { key: "j"},
                { key: "k"},
                { key: "l"}
            ]
        }
    }
    _renderItem = data =>{
        return <Text style={styles.row}>{data.item.key}</Text>
    }
    render(){
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data} renderItem={this._renderItem} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    row: {fontSize: 24, padding: 70, borderWidth: 1, borderColor: "red"}
});

export default SimpleList;