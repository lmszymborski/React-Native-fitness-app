import React from "react";
import { Header } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Platform } from "react-native";

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
      activity: 0,
      currFirstName: "",
      currLastName: '',
      currCalories: 0,
      currProtein: 0,
      currCarbs: 0,
      currFat: 0,
      currActivity: 0
    }
  }

  getProfile() {
    fetch('https://cs571.cs.wisc.edu/users/' + this.props.username, {
      method: "GET",
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => response.json())
    .then(response => { 
      console.log(response)
      this.setState({ currFirstName: response.firstName})
      this.setState({ currActivity: response.goalDailyActivity})
      this.setState({ currCalories: response.goalDailyCalories})
      this.setState({ currCarbs: response.goalDailyCarbohydrates})
      this.setState({ currFat: response.goalDailyFat})
      this.setState({ currProtein: response.goalDailyProtein})
      this.setState({ currLastName: response.lastName})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  }

  componentDidMount() {
    fetch('https://cs571.cs.wisc.edu/users/' + this.props.username, {
      method: "GET",
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => response.json())
    .then(response => { 
      console.log(response)
      this.setState({ currFirstName: response.firstName})
      this.setState({ currActivity: response.goalDailyActivity})
      this.setState({ currCalories: response.goalDailyCalories})
      this.setState({ currCarbs: response.goalDailyCarbohydrates})
      this.setState({ currFat: response.goalDailyFat})
      this.setState({ currProtein: response.goalDailyProtein})
      this.setState({ currLastName: response.lastName})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  }

  submit() {
    let {firstName, lastName, calories, protein, carbs, fat, activity} = this.state;
    console.log('route params:')
 //   console.log(this.props.route.params)
   // const { username, token } = this.props.route.params;
   console.log(this.props)
   let username = this.props.username;
   let token = this.props.accessToken;

  if (firstName == "")
    firstName = this.state.currFirstName
  if (lastName == "")
    lastName = this.state.currLastName
  if (calories == "")
    calories = this.state.currCalories
  if (protein == "")
    protein = this.state.currProtein
  if (fat == "")
    fat = this.state.currFat
  if (activity == "")
    activity = this.state.currActivity


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
      alert("Profile saved!")
      console.log(this)
      this.getProfile();
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation in submit: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
  }

  render() {
    const {firstName, lastName, calories, protein, carbs, fat, activity} = this.state;

    return (
      <ScrollView style={styles.container}>

        <Text style={styles.title}>Personal Information</Text>
        <Text>First Name: {this.state.currFirstName}</Text>
        <Text>Last Name: {this.state.currLastName}</Text>

        <Text style={styles.title}>Fitness Goals</Text>
        <Text>Daily Calories: {this.state.currCalories}</Text>
        <Text>Daily Protein: {this.state.currProtein}</Text>
        <Text>Daily Carbohydrates: {this.state.currCarbs}</Text>
        <Text>Daily Fat: {this.state.currFat}</Text>
        <Text>Daily Activity: {this.state.currActivity}</Text>

        <Text style={styles.title}>Edit Profile</Text>
        <Text>First Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="First Name"
          onChangeText={firstName => this.setState({ firstName })} />
        <Text>Last Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          onChangeText={lastName => this.setState({ lastName })}/>
        <Text>Daily Calories (kcal)</Text>       
        <TextInput 
          style={styles.input} 
          placeholder="Daily Calories (kcal)" 
          onChangeText={calories => this.setState({ calories })}/>
        <Text>Daily Protein (grams)</Text>       
        <TextInput 
          style={styles.input} 
          placeholder="Daily Protein (grams)" 
          onChangeText={protein => this.setState({ protein })}/>
        <Text>Daily Carbs (grams)</Text>       
        <TextInput 
          style={styles.input} 
          placeholder="Daily Carbs (grams)" 
          onChangeText={carbs => this.setState({ carbs })}/>
        <Text>Daily Fat (grams)</Text>       
        <TextInput 
          style={styles.input} 
          placeholder="Daily Fat (grams)" 
          onChangeText={fat => this.setState({ fat })}/>
        <Text>Daily Activity (mins)</Text>       
        <TextInput 
          style={styles.input} 
          placeholder="Daily Activity (mins)" 
          onChangeText={activity => this.setState({ activity })}/>

        <Button
          title="Save Profile"
          onPress={this.submit.bind(this)}
        />
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*
    justifyContent: "center",*/
    marginHorizontal: 20,
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
