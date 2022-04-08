import React from "react";
import { StyleSheet, Text, View, Button, Modal, Pressable, TextInput, Platform } from "react-native";
import {Card} from 'react-native-elements'

class ExercisesView extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        modalVisible: false,
        exercise_name: "",
        duration: 0,
        num_calories: 0,
        exercise_list: [],
        edit_visible: false,
      }

      this.getExerciseCard = this.getExerciseCard.bind(this);
      this.createExercise = this.createExercise.bind(this);
      this.setModalVisible = this.setModalVisible.bind(this);
      this.getExercises = this.getExercises.bind(this);
      this.getExercises = this.getExercises.bind(this);
      this.listExercises = this.listExercises.bind(this);



  }

  /*
          <Modal
          show={this.state.showModal}
          onHide={() => this.closeModal()}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Exercise</Modal.Title>
          </Modal.Header>

        </Modal>*/
  createExercise() {
    this.setState({ modalVisible: false });

    let exercise_name = this.state.exercise_name;
    let duration = this.state.duration;
    let num_calories = this.state.num_calories;
    console.log(exercise_name)
    console.log(duration)
    console.log(num_calories)
    
    let token = this.props.accessToken;
    console.log(token)


    fetch('https://cs571.cs.wisc.edu/activities/', {

      method: "POST",
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.accessToken,
      },
      body: JSON.stringify({
        name: this.state.exercise_name,
        duration: this.state.duration,
        calories: this.state.num_calories,
        date: "2021-11-10T03:04:57.153Z",
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('yay!')
      console.log(res.message)
      alert("Exercise Added!")
      this.getExercises();
    })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    fetch('https://cs571.cs.wisc.edu/activities/', {

      method: "GET",
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => response.json())
    .then(response => { 
      this.setState({ exercise_list: response.activities })
    })
  }

  getExercises() {
    fetch('https://cs571.cs.wisc.edu/activities/', {
      method: "GET",
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => response.json())
    .then(response => { 
      console.log(response)
      this.setState({ exercise_list: response.activities})
      console.log(this.state.exercise_list)
    })
  }

  listExercises() {
    let exercises = [];
    console.log(this.state.exercise_list)
    this.state.exercise_list.forEach((exercise, index) => {
        exercises.push(this.getExerciseCard(index, exercise));
      })
    return exercises;
  }

  deleteActivity(exercise) {
    fetch('https://cs571.cs.wisc.edu/activities/' + exercise.id, {
      method: 'DELETE',
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => {
      if (!response.ok) throw response;
      return response.json();
    })
    .then(responseJson => {
      alert("Acitvity Deleted!");
      this.getExercises();
    })
  }
  
  openEditActivityModal = (visible) => {
    this.setState({edit_visible: visible})
  }

  editActivity(exercise) {
    this.openEditActivityModal(!this.state.edit_visible);
    console.log(this.state.exercise_name)
    console.log(this.state.duration)
    console.log(this.state.num_calories)
    fetch('https://cs571.cs.wisc.edu/activities/' + exercise.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.accessToken,
      },
      body: JSON.stringify({
        name: this.state.exercise_name,
        duration: this.state.duration,
        calories: this.state.num_calories,
        date: "2021-11-10T03:04:57.153Z",
      })
    })
    .then(responseJson => {
      alert("Activity edited!");
      this.getExercises();
    })
  }

  getExerciseCard(key, exercise) {
    const { edit_visible } = this.state;

    return <Card>
        <Card.Title>{exercise.name}</Card.Title>
        <Card.Divider/>
        <Text>Duration: {exercise.duration}</Text>
        <Text>Calories burned: {exercise.calories}</Text>
        <Text>Date: {exercise.date}</Text>
        <Button title="Edit" onPress={this.openEditActivityModal.bind(this)}></Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={edit_visible}
          onRequestClose={() => {
            this.setModalVisible(!edit_visible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Edit Activity</Text>
              <TextInput
                style={styles.input}
                placeholder={exercise.name}
                onChangeText={exercise_name => this.setState({ exercise_name })} 
              />
              <TextInput
                style={styles.input}
                placeholder={exercise.duration}
                onChangeText={duration => this.setState({ duration })} 
              />
              <TextInput
                style={styles.input}
                placeholder={exercise.calories}
                onChangeText={num_calories => this.setState({ num_calories })} 
              />
              <Button title="Change Activity" onPress={this.editActivity.bind(this, exercise)}></Button>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.openEditActivityModal(!edit_visible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Button title="Delete" onPress={this.deleteActivity.bind(this, exercise)}></Button>
      </Card>
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={styles.centeredView}>
        <Button title="Create exercise" onPress={this.setModalVisible.bind(this)}></Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Create New Exercise</Text>
              <TextInput
                style={styles.input}
                placeholder="Exercise name"
                onChangeText={exercise_name => this.setState({ exercise_name })} 
              />
              <TextInput
                style={styles.input}
                placeholder="Duration"
                onChangeText={duration => this.setState({ duration })} 
              />
              <TextInput
                style={styles.input}
                placeholder="Number of Calories"
                onChangeText={num_calories => this.setState({ num_calories })} 
              />
              <Button title="Add" onPress={this.createExercise.bind(this)}></Button>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View>{this.listExercises()}</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ExercisesView;
