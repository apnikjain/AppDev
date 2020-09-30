import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    StatusBar
} from 'react-native'

const NoteCard = (props) =>{
    
    return (
        <TouchableOpacity 
                style={styles.parentView} 
                onPress={() =>{
                    props.navigation.navigate('editNoteScreen',{
                        "item": props.item
                    })
                }}
            >
            

                <View style={{
                                borderRadius: 10, 
                                padding: 15,
                                backgroundColor: props.item.category_name == 'Work' ? '#C0EB6A' : 
                                                (props.item.category_name == 'Learn' ? '#2FC2DF' : 
                                                (props.item.category_name == 'Wishlist' ? '#FAD06C' : '#FF92A9')
                                                )
                            }}>
                    <Text style={styles.date}>
                        {props.item.time}
                    </Text>
                    <Text numberOfLines={1} style={styles.title}>
                        {props.item.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.category}>
                        {props.item.category_name}
                    </Text>
                    <Text numberOfLines={5} style={styles.note}>
                        {props.item.note}
                    </Text>
                </View>
                
            </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    parentView: {
        borderRadius: 10,
        margin: 13,
        flex: 1,   
    },
    date: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    title: {
      color: 'white',
      fontSize: 23,
      fontWeight: 'bold',
      marginTop: 10,
    },
    category: {
      fontSize: 15,
      color: 'white',
    },
    note: {
        color: 'white',
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export default NoteCard