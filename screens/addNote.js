import React,{useState} from 'react'
import {View, Text, StyleSheet, ScrollView, TextInput, Picker, Button} from 'react-native'

const addNote =(props) =>{
        const length = props.navigation.getParam("length")
        const[selectedCategory,setSelectedCategory] = useState("Select Category")
		const[title,setTitle] = useState()
		const[description,setdescription] = useState()
		state = {
			category: [
                {
					id: 0,
					category_name: 'Select Category....'
				},
				{
					id: 1,
					category_name: 'Personal'
				},
				{
					id: 2,
					category_name: 'Wishlist'
				},
				{
					id: 3,
					category_name: 'Learn'
				},
				{
					id: 4,
					category_name: 'Work'
				},
			],
			
        }
        const submitHandler =async() =>{
            const date = new Date()
            const string = ""
            const formatDate = string.concat(date.getDate(),"/",date.getMonth(),"/",date.getFullYear())

            const response = await fetch('https://notes-app-8d23c.firebaseio.com/notes.json',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title,
                    "note" : description,
                    "category_name" : selectedCategory,
                    "time" : formatDate
                })
            })
            
            props.navigation.goBack()
        }
    return (
        <View style = {styles.screen}>
            <TextInput
                value = {title}
                placeholder = "Title"
                style = {styles.title}
                onChangeText = {(value) => setTitle(value)}
            />
            <TextInput
                value = {description}
                placeholder = "Add description"
                multiline= {true}
				numberOfLines={10}
                style = {styles.description}
                onChangeText = {(value) =>setdescription(value)}
            />
            <Picker
                selectedValue = {selectedCategory}
                style = {{height:50, width:"100%",margin:10}}
                onValueChange = {(itemValue) =>{
                    setSelectedCategory(itemValue)
                }}
            >
            {
                state.category.map((item) =>{
                    return (
                        <Picker.Item key = {item.id} label = {item.category_name} value = {item.category_name}/>
                    )
                })
            }
            </Picker>
            <View style = {styles.button}>
            <Button  title = "Add" onPress = {submitHandler} />
            </View>
        </View>
    )
}

addNote.navigationOptions = navData =>{
    return{
        headerTitle:'Add Note'
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center'
      
    },
    title:{
        fontSize: 25,
		textAlignVertical: 'top',
        height:80,
        margin:20
    },
    description:{
        fontSize: 20,
		textAlignVertical: 'top',
        
        margin:20
    },
    button:{
        position: 'absolute',
        bottom:0,
        width:"100%",
    }
})

export default addNote