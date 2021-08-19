/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react'
import type {Node} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SignInScreen } from './screens/SignInScreen'
import { SignUpScreen } from './screens/SignUpScreen'
import { HomeScreen } from './screens/HomeScreen'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ImageViewScreen } from './screens/ImageViewScreen'
import { VideoViewScreen } from './screens/VideoViewScreen'
import { DocViewScreen } from './screens/DocViewScreen'
import { AudioViewScreen } from './screens/AudioViewScreen'
import { ImageEditorScreen } from './screens/ImageEditorScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AccountMenu from './components/AccountMenu'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();


GoogleSignin.configure(
  {
      webClientId: "1065943739458-uflgordb49c9o4mg468d1q6t0m6v4k7v.apps.googleusercontent.com",
      offlineAccess:true
  }
)

function DrawerRoutes({ route, navigation }) {
  
  return(
    <Drawer.Navigator 
    initialRouteName = "Home"
    drawerContent = {(props) => <AccountMenu {...props}/>}
    >
      <Drawer.Screen name = "Home" component = {HomeScreen} initialParams = {route.params}/>
    </Drawer.Navigator>
  )

}

const App: () => Node = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'SIGN UP', headerTitleAlign: 'center' }}
        />
        <Stack.Screen 
          name="Home" 
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ImageView" 
          component={ImageViewScreen}
          options={({route}) => ({ headerShown: true, title: route.params.document.fileName})}
        />
        <Stack.Screen 
          name="VideoView" 
          component={VideoViewScreen}
          options={({route}) => ({ headerShown: true, title: route.params.document.fileName})}
        />
        <Stack.Screen 
          name="DocView" 
          component={DocViewScreen}
          options={({route}) => ({ headerShown: true, title: route.params.document.fileName})}
        />
        <Stack.Screen 
          name="AudioView" 
          component={AudioViewScreen}
          options={({route}) => ({ headerShown: true, title: route.params.document.fileName})}
        />
        <Stack.Screen 
          name="ImageEditor" 
          component={ImageEditorScreen}
          //options={({route}) => ({ headerShown: true, title: route.params.document.fileName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
