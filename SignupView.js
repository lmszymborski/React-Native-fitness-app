import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64

class SignupView extends React.Component {
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
    const {username, password} = this.state;
    const encoded = base64.encode(password);
    if (username.length < 1) {
      alert('Enter username');
    }
    else if (password.length < 1) {
      alert('Enter password');
    }
    else if (password.length < 5) {
      alert('Password must  be at least 5 characters')
    }
    else if (username.length < 5) {
      alert('Username must be at least 5 characters')
    }
    else {
      let body = JSON.stringify({
        username: username,
        password: password
      })
      console.log('body', body)
      fetch('https://cs571.cs.wisc.edu/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      })
      .then(response => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then(responseJson => {
        alert("User created!")
        this.navigateToPage(responseJson);
      })
      .catch(error => {
        if (error instanceof Error) {
          console.log(error);
        }
        else {
          error.json().then((body) => {
            if(body.message) {
              alert(body.message);
            }
              console.log(body);
          });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to SignupView</Text>
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
        <Button title="Button" onPress={this.login.bind(this)} />
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

export default SignupView;
