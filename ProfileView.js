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
     // this.setState({ exercise_list: response.activities})
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
      this.setState({ firstName: response.firstName})
      this.setState({ activity: response.goalDailyActivity})
      this.setState({ carbs: response.goalDailyCarbohydrates})
      this.setState({ fat: response.goalDailyFat})
      this.setState({ protein: response.goalDailyProtein})
      this.setState({ lastName: response.lastName})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  }

  submit() {
    const {firstName, lastName, calories, protein, carbs, fat, activity} = this.state;
    console.log(lastName)
    console.log('route params:')
 //   console.log(this.props.route.params)
   // const { username, token } = this.props.route.params;
   console.log(this.props)
   let username = this.props.username;
   let token = this.props.accessToken;


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
    /*
    .then(response => {
      if (!response.ok) throw response;
      return response.json();
    })
    .then(responseJson => {
      console.log('yay!')
      alert("Profile saved!")
    })*/
    .then(function(response){
      this.getProfile();
      alert("Profile saved!")
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <Text>First Name: {this.state.firstName}</Text>
        <Text>Last Name: {this.state.lastName}</Text>
        <Text>Daily Calories: {this.state.calories}</Text>
        <Text>Daily Protein: {this.state.protein}</Text>
        <Text>Daily Carbohydrates: {this.state.carbs}</Text>
        <Text>Daily Fat: {this.state.fat}</Text>
        <Text>Daily Activity: {this.state.activity}</Text>

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
