import React from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, View, Button, TextInput, Platform } from "react-native";

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      activity: 0
    }
  }

  submit() {
    const {firstName, lastName, calories, protein, carbs, fat, activity} = this.state;
    console.log('route params:')
    console.log(this.props.route.params)
    const { username, token } = this.props.route.params;


    fetch('https://cs571.cs.wisc.edu/users/' + username, {

      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        goalDailyCalories: calories,
        goalDailyProtein: protein,
        goalDailyCarbohydrates: carbs,
        goalDailyFat: fat,
        goalDailyActivity: activity
      })
    })
    .then(response => {
      if (!response.ok) throw response;
      return response.json();
    })
    .then(responseJson => {
      console.log('yay!')
      alert("Profile saved!")
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <TextInput 
          style={styles.input} 
          placeholder="First Name"
          onChangeText={firstName => this.setState({ firstName })} />
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          onChangeText={lastName => this.setState({ lastName })}/>
        <Text style={styles.title}>Fitness Goals</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Daily Calories (kcal)" 
          onChangeText={calories => this.setState({ calories })}/>
        <TextInput 
          style={styles.input} 
          placeholder="Daily Protein (grams)" 
          onChangeText={protein => this.setState({ protein })}/>
        <TextInput 
          style={styles.input} 
          placeholder="Daily Carbs (grams)" 
          onChangeText={carbs => this.setState({ carbs })}/>
        <TextInput 
          style={styles.input} 
          placeholder="Daily Fat (grams)" 
          onChangeText={fat => this.setState({ fat })}/>
        <TextInput 
          style={styles.input} 
          placeholder="Daily Activity (mins)" 
          onChangeText={activity => this.setState({ activity })}/>

        <Button
          title="Save Profile"
          onPress={this.submit.bind(this)}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'fixed',
    height: 60,
    width: '100%'
  },
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
