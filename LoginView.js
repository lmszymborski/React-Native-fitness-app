import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64

class LoginView extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.
  // https://stackoverflow.com/questions/43842793/basic-authentication-with-fetch

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  login() {
    const base64 = require('base-64');

    console.log('button clicked')
    const {username, password} = this.state;
    if (username.length < 1) {
      alert('Enter username');
    }
    else if (password.length < 1) {
      alert('Enter password');
    }
    else {
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
      let auth = 'Basic ' + base64.encode(username + ":" + password)
      console.log(auth);

      fetch('https://cs571.cs.wisc.edu/login', {
        method: "GET",
        headers: {
          'Authorization': auth,
        },
      })
      .then(response => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson)
        console.log(this.props)
       // this.props.setAccessToken.bind(this, responseJson.token);
        this.props.setAccessToken(responseJson.token);
        this.props.setUsername(username);
        this.props.navigation.navigate('Home');
       // this.props.navigation.navigate('Profile', {screen: "Profile", props: {username: username,token: responseJson.token}})
      })
      .catch(error => {
        if (error instanceof Error) {
          console.log(error);
        }
        else {
          error.json().then((body) => {
              alert("Username or password is incorrect");
              console.log(body);
          });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to LoginView</Text>
        <TextInput 
          style={styles.input}
          onChangeText={username => this.setState({ username })}
          placeholder="Username" />
        <TextInput 
          style={styles.input} 
          onChangeText={password => this.setState({ password })}
          placeholder="Password" />

        {/* To navigate to another component, use this.props.navigation.navigate().
            See https://reactnavigation.org/docs/navigating for more details.
          */}
        <Button title="Submit" onPress={this.login.bind(this)} />
        <Button title="Sign Up" onPress={()=> this.props.navigation.navigate('SignUp')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default LoginView;
