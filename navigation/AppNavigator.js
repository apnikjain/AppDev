import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Home from '../screens/HomeScreen';
import addNote from '../screens/addNote';
import editNote from '../screens/editNote';

const Navigation = createStackNavigator({
    homeScreen:Home,
    addNoteScreen: addNote,
    editNoteScreen: editNote
})


export default createAppContainer(Navigation)

