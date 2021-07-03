import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from './localdb';
//import {Header} from 'react-native-elements';

export default class HomeScreen extends React.Component{
    getWord=(word)=>{
        var text=word.toLowerCase().trim();
        if(db[text]){
            var word=db[text]["word"];
            var lexicalCategory=db[text].lexicalCategory;
            var definition=db[text].definition;
            this.setState({
                word:word,
                lexicalCategory:lexicalCategory,
                definition:definition
            })
        }
        else{
            this.setState({
                word:word,
                lexicalCategory:"Not Found",
                definition:"Not Found"
            })
        }
    }
    constructor(){
        super();
        this.state={
            input:''
        }
    }
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.heading}>
                        Offline Dictionary
                    </Text>
                </View>

                <TextInput style={styles.textInput} onChangeText={text=>{
                    this.setState({
                        input:text,
                        isSearchPressed:false,
                    });
                }} />

                <TouchableOpacity style={styles.search}
                onPress={()=>{
                    this.setState({isSearchPressed:true,word:this.state.input})
                    this.getWord(this.state.input);
                }}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>

                <View style={{marginLeft:20}}>
                        <View>
                            <Text style={styles.detailHeading}>Word: {" "}</Text>
                            <Text style={styles.detail}>
                                {this.state.word}
                            </Text>

                            <Text style={styles.detailHeading}>
                                Type: {" "}
                            </Text>
                            
                            <Text style={styles.detail}>
                                {this.state.lexicalCategory}
                            </Text>

                            <Text style={styles.detailHeading}>
                                Definition:
                            </Text>
                            
                            <Text style={styles.detail}>
                                {this.state.definition}
                            </Text>
                        </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        color:'blue',
        padding:10,
        fontSize:30,
        fontWeight:'bold'
    },
    textInput:{
        outline:'none',
        borderWidth:4,
        width:'80%',
        marginTop:50,
        height:40,
        alignSelf:'center',
        textAlign:'center'
    },
    search:{
        alignSelf:"center",
        marginTop:15,
        backgroundColor:"blue",
        width:100,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20
    },
    searchText:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
    },
    detailHeading:{
        fontSize:30,
        fontWeight:'bold',
    },
    detail:{
        marginLeft:30,
        fontSize:25,
        color:'blue',
        fontWeight:'bold'

    }
})