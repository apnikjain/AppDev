import React,{useState, useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Picker, Button} from 'react-native'

const editNote =(props) =>{
        
        const[selectedCategory,setSelectedCategory] = useState("Select Category")
        const[title,setTitle] = useState()
        const[description,setdescription] = useState()
        const[id,setId] = useState()
        

        useEffect(() =>{
            const item = props.navigation.getParam("item")
            setId(item.id)
            setSelectedCategory(item.category_name)
            setTitle(item.title)
            setdescription(item.note)
        },[])


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
            const response = await fetch(`https://notes-app-8d23c.firebaseio.com/notes/${id}.json`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title,
                    "note" : description,
                    "category_name" : selectedCategory,
                    "time" : new Date(),
                })
            })
            props.navigation.goBack()
        }
        const deleteHandler = async() =>{
            const response = await fetch(`https://notes-app-8d23c.firebaseio.com/notes/${id}.json`,{
                method:'DELETE'
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
            <Button  title = "Save" onPress = {submitHandler} />
            <Button  title = "Delete" color = "red" onPress = {deleteHandler} />
            </View>
        </View>
    )
}

editNote.navigationOptions = navData =>{
    return{
        headerTitle:'Edit Note'
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

export default editNote