import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class ProfileView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Profile View</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />

        <Button
          title="Button"
          onPress={() => console.log("I am a button from ProfileView!")}
        />
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

export default ProfileView;
