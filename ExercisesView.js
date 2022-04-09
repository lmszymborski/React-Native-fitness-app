import React from "react";
import { ScrollView, StyleSheet, Text, View, Button, Modal, Pressable, TextInput, Platform } from "react-native";
import {Card} from 'react-native-elements'

class ExercisesView extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        modalVisible: false,
        exercise_name: "New Activity",
        duration: 0,
        num_calories: 0,
        exercise_list: [],
        opened: false,
        key_opened: 0
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
        date: new Date(),
      })
    })
    .then(res => res.json())
    .then(res => {
      alert("Exercise Added!")
      this.getExercises();
    })
  }

  setModalVisible = (visible) => {
    console.log("set modal visibl")
    this.setState({ modalVisible: visible });
  }

  setEditModalVisible = (visible) => {
    this.setState({ edit_visible: visible })
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
    console.log('getexerciss')
    fetch('https://cs571.cs.wisc.edu/activities/', {
      method: "GET",
      headers: {
        'x-access-token': this.props.accessToken,
      }
    })
    .then(response => response.json())
    .then(response => { 
      this.setState({ exercise_list: response.activities})
    })
  }

  listExercises() {
    let exercises = [];
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
  
  openEditActivityModal(key, opened) {
    this.setState({key_opened: key})
    this.setState({opened: opened})
  }

  editActivity(exercise) {
    this.openEditActivityModal(!this.state.edit_visible);
    if (this.state.exercise_name == "")
      this.setState({exercise_name: exercise.name})
    if (this.state.duration == 0)
      this.setState({duration: exercise.duration})
    if (this.state.num_calories == 0)
      this.setState({num_calories: exercise.calories})
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
        date: new Date(),
      })
    })
    .then(responseJson => {
      alert("Activity edited!");
      this.getExercises();
    })
  }

  getExerciseCard(key, exercise) {
    let edit_visible = false;
    let date = new Date(exercise.date)
    const exercise_name = exercise.name;
    const exercise_duration = exercise.duration;
    console.log('ex dur: ' + exercise.duration)
    const exercise_calories = exercise.calories;
    if (this.state.opened == true && this.state.key_opened == key) {
      edit_visible = true;
    }
    console.log('edit visible ' + edit_visible)
    console.log('key ' + this.state.key_opened)

    return <Card>
        <Card.Title>{exercise_name}</Card.Title>
        <Card.Divider/>
        <Text>Duration: {exercise_duration}</Text>
        <Text>Calories burned: {exercise_calories}</Text>
        <Text>Date: {date.toLocaleString('en-US', { timeZone: 'HST' })}</Text>
        <Button title="Edit" onPress={this.openEditActivityModal.bind(this, key, true)}></Button>
      <Modal
            animationType="slide"
            transparent={true}
            visible={edit_visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Edit Activity</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              placeholder={exercise.name}
              placeholderTextColor="gray"
              onChangeText={exercise_name => this.setState({ exercise_name })} 
            />
            <Text>Duration</Text>
            <TextInput
              style={styles.input}
              placeholder={String(exercise.duration)}
              placeholderTextColor="gray"
              onChangeText={duration => this.setState({ duration })} 
            />
            <Text>Calories</Text>
          <TextInput
            style={styles.input}
            placeholder={String(exercise.calories)}
            placeholderTextColor="gray"
            onChangeText={num_calories => this.setState({ num_calories })} 
          />
            <Button title="Change Activity" onPress={this.editActivity.bind(this, exercise)}></Button>
            <Button
            style={[styles.button, styles.buttonClose]}
            onPress={this.openEditActivityModal.bind(this, key, false)}
            title="Close"
          ></Button>
          </View>
        </View>
    </Modal>
        <Button title="Delete" onPress={this.deleteActivity.bind(this, exercise)}></Button>
      </Card>
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <ScrollView style={styles.centeredView}>
        <Button title="Create exercise" onPress={this.setModalVisible.bind(this, true)}></Button>
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
              <Text>Exercise Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Exercise name"
                placeholderTextColor="gray"
                onChangeText={exercise_name => this.setState({ exercise_name })} 
              />
              <Text>Duration</Text>
              <TextInput
                style={styles.input}
                placeholder="Duration"
                placeholderTextColor="gray"
                onChangeText={duration => this.setState({ duration })} 
              />
              <Text>Calories Burned</Text>
              <TextInput
                style={styles.input}
                placeholder="Number of Calories"
                placeholderTextColor="gray"
                onChangeText={num_calories => this.setState({ num_calories })} 
              />
              <Button title="Add" onPress={this.createExercise.bind(this)}></Button>
              <Button
                title="Hide"
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
              </Button>
            </View>
          </View>
        </Modal>
        <View>{this.listExercises()}</View>

      </ScrollView>
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
    /*
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,*/
    marginHorizontal: 20,
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
