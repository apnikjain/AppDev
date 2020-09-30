import React, { useEffect, useCallback, useState } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, Image, StatusBar, FlatList,ActivityIndicator} from 'react-native'
import NoteCard from '../components/NoteCard';

const Home = (props) =>{
    const [isLoading,setIsLoading] = useState(true)
    const [notes,setNotes] = useState([])
    // var state = {
    //   notes: [
    //     {
    //                 "id" : 1,
    //                 "title": "df",
    //                 "note" : "sdf",
    //                 "category_name" : "sdf",
    //                 "time" : "df"
    //       }
    //   ]
    // }
    const loadedData = useCallback(async() =>{
        const response = await fetch("https://notes-app-8d23c.firebaseio.com/notes.json")
        const resData = await response.json()
        var arr = []
        for(var key in resData){
          var temp = {
            "id" : key,
            "title": resData[key].title,
            "note" : resData[key].note,
            "category_name" : resData[key].category_name,
            "time" : resData[key].time
          }
            arr.push(temp)
            setNotes(arr)
        }       
        console.log(notes);
    },[])

    useEffect(() => {
      props.navigation.addListener(
          'didFocus',
          payload => {
            setIsLoading(true)
        
            loadedData().then(() =>{setIsLoading(false)})
          }
      );
  }, [loadedData])
    
    useEffect(() =>{
        setIsLoading(true)
        
        loadedData().then(() =>{setIsLoading(false)})
    },[loadedData])
    
    
    if(isLoading){
        return(
          <View style = {{...styles.conatainer,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size = 'large' color = "black"/>
          </View>
          )
      }
    return (
        <View style = {styles.conatainer}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
            <FlatList
                style = {styles.FlatList}
                data = {notes}
                numColumns = {2}
                keyExtractor = {(item) => item.id}
                renderItem = {({item}) => {
                    return(
                        <NoteCard item = {item} navigation = {props.navigation}/>
                    )
                }}
            />
            <TouchableOpacity 
					style={styles.actionButton}
					onPress={() =>{props.navigation.navigate('addNoteScreen')}}
				>
					<Text style={styles.actionButtonLogo}>+</Text>
                </TouchableOpacity>
                

        </View>
    )
}

Home.navigationOptions = ({navigation}) =>{
    return {
        headerLeft: () =>(
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                marginLeft: 15,
              }} 
              source={require('../assets/profile-picture.jpeg')}
            />
          </TouchableOpacity>
        ),
        headerTitle: 'Notes-App',
          headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
          },
         
      } 
}

const styles = StyleSheet.create({
    conatainer :{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    flatList:{
        paddingHorizontal: 10,
		marginTop: 20,
    },
    actionButton: {
		width: 70,
		height: 70,
		backgroundColor: 'white',
		borderRadius: 100, 
		position: 'absolute',
		elevation: 10,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		right: 30
	},
	actionButtonLogo: {
		fontSize: 30,
		fontWeight:'bold'
	},
	isLoading: {
		marginTop: 100,
	},
	isError: {
		alignSelf: 'center',
		fontSize: 20,
		marginTop: 100,
	}
})

export default Home