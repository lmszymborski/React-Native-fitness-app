import 'react-native-gesture-handler';
import React from "react";

import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";
import ExercisesView from "./ExercisesView";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Button} from "react-native";

// Review the navigators from React Native 2 lecture.
const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)
const Drawer = createDrawerNavigator(); // Drawer Navigator (https://reactnavigation.org/docs/drawer-navigator)

class App extends React.Component {
  constructor() {
    super();

    // Feel free to add more states here
    this.state = {
      accessToken: undefined,
      username: undefined
    };
  }

  // Set the access token
  
  setAccessToken = (newAccessToken) => {
    this.setState({ accessToken: newAccessToken });
    console.log(this.state.accessToken)
  };
/*
  setAccessToken() {
    this.setState({ accessToken: newAccessToken });
    console.log(this.state.accessToken)
    console.log('HERE!!!!')
  }*/

  setUsername = (newUsername) => {
    this.setState({ username: newUsername })
    console.log(this.state.username)
  }

  logout() {

  }

  /*
            <Stack.Screen name="Profile">
            {(props) => <ProfileView {...props} />}
          </Stack.Screen>
          */
  Home = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Profile"
        >
            {(props) => (
              <ProfileView {...props} username={this.state.username} accessToken={this.state.accessToken} />
            )}
        </Tab.Screen>
        <Tab.Screen name="Exercise">
            {(props) => (
              <ExercisesView {...props} username={this.state.username} accessToken={this.state.accessToken} />
            )}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* We only want to show Login and Signup View when the user is not logged in.
              When the user is logged in, we want to show the Profile View and the Exercises View.
              
              How do we do this? See https://reactnavigation.org/docs/auth-flow
            */}
          <Stack.Screen name="Login">
            {/* This is how you pass props (e.g. setAccessToken) to another component */}
            {(props) => (
              <LoginView {...props} setAccessToken={this.setAccessToken} setUsername={this.setUsername}/>
            )}
          </Stack.Screen>

          {/* If you do not need to pass props, you can pass a component as a `component` prop to Screens like below */}
          <Stack.Screen name="SignUp" component={SignupView} />
              
          {/* We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
              See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.
            */}
            {(props) => (
              <SignupView {...props} setAccessToken={this.setAccessToken} setUsername={this.setUsername}/>
            )}


          <Stack.Screen 
            name="Home" 
            component={this.Home}
            options={{
              headerBackTitle: 'Log out',
            }}>

          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>


    );
  }
}

/*
          <Stack.Screen name="Home" component={(props) => <NestedView {...this.props} testProp="some test prop string" />} /> 


          <Stack.Screen name="Home" component={Home} />
              
              {/* We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
                  See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.
                
                {(props) => (
                  <Home {...props} username={this.state.username} token={this.state.accessToken}/>
                )}
*/

export default App;
