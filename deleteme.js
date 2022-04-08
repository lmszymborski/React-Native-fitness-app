
import React from "react";
import { StyleSheet, Text, View, Button, Modal, Pressable, TextInput, Platform } from "react-native";

class ExercisesView extends React.Component {
  constructor() {
    super();
      this.state = {
        modalVisible: false,
        exercise_name: "",
        duration: 0,
        num_calories: 0,
        exercise_list: undefined
      }
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
    
    let token = this.props.accessToken;


    fetch('https://cs571.cs.wisc.edu/activities/', {

      method: "POST",
      headers: {
        'x-access-token': token,
      },
      body: JSON.stringify({
        name: exercise_name,
        duration: duration,
        calories: num_calories,
        date: "2021-11-09T03:04:57.153Z"
      })
    })
    .then(response => {
      if (!response.ok) throw response;
      return response.json();
    })
    .then(responseJson => {
      console.log('yay!')
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
      console.log(response)
      this.setState({ exercise_list: response })
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
      this.setState({ exercise_list: response})
    })
  }

  listExercises() {
    let exercises = [];
    console.log(this.state.exercise_list)

    if (this.state.exercise_list) {
  //    console.log(this.state.exercise_list["activities"])
      exercises = this.state.exercise_list["activities"].map((exercise) => (
        <Text>{exercise.name}</Text>

      ))
    }
    return exercises;
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

