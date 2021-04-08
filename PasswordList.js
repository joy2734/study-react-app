import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";

const Separator = () => (
    <View style={styles.separator} />
  );

class PasswordList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [
                {key: "a"},
                {key: "b"},
                {key: "c"}
            ]
        }
    }
    _renderItem = data =>{
        return <Text style={styles.row}>{data.item.key}</Text>
    }
    componentDidMount(){
        
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    row:{fontSize: 24, padding: 42, borderWidth: 1, borderColor: "#DDDDDD"}
});

export default PasswordList;