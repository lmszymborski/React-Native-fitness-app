import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64

class LoginView extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to LoginView</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />

        {/* To navigate to another component, use this.props.navigation.navigate().
            See https://reactnavigation.org/docs/navigating for more details.
          */}
        <Button title="Button" onPress={() => console.log("I am a button!")} />
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
