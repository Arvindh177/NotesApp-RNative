import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Button, ScrollView } from 'react-native';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modelVisible, setModalVisible] = useState(false);

  
  const handleSaveNote = () => {
    if(selectedNotes) {
      const updateNotes = notes.map((note) => 
      note.id === selectedNotes.id ? { ...note, title, content} : note );
      setNotes(updateNotes);
      setSelectedNotes(null);
     } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes,newNote]);
     }
     setTitle("");
     setContent("");
     setModalVisible(false);

  };

  const handleEdit = (note) => {
    setSelectedNotes(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);

  };

  const handleDeleteNote = (note) => {
    const updateNotes = notes.filter(
      (item) => item.id !== note.id
    );
    setNotes(updateNotes);
    setSelectedNotes(null);
    setModalVisible(false);

  };
  

  return(
    <View style = { styles.container}>
      <Text style={ styles.title}>My Notes</Text>
      <ScrollView style= {styles.noteList}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            onPress={()=> handleEdit(note)}
          >
            <Text style={styles.noteTitle}>
              {note.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
      style={styles.addButton}
      onPress={()=>{
        setTitle("");
        setContent("");
        setModalVisible(true);
      }}>
        <Text style={styles.addButtonText}>
          Add note
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modelVisible}
        animationType='slide'
        transparent={false}>
        <View style={styles.modalContainer}>
          <TextInput
          style={styles.input}
          placeholder='Enter note title'
          value={title}
          onChangeText={setTitle}/>
          <TextInput 
          style={styles.contentInput}
          multiline
          placeholder='Enter note content'
          value={content}
          onChangeText={setContent}/>
          <View style={styles.buttonContainer}>
            <Button title="Save"
            onPress={handleSaveNote}
            color="#007BFF"/>
            <Button
            title="Cancel"
            onPress={()=> 
              setModalVisible(false)
            }
            color="#FF3B30"/>
            {selectedNotes && (
              <Button
              title="Delete"
              onPress={ ()=> handleDeleteNote( selectedNotes)}
              color="#FF9500"/>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )

 };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15, 
        marginBottom: 10, 
        fontWeight: "bold", 
        color: "black", 
        backgroundColor: "white", 
        height: 40, 
        width: "100%", 
        padding: 10, 
        borderRadius: 8, 
  },
  addButton: { 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#007BFF", 
    paddingVertical: 12, 
    borderRadius: 5, 
    marginTop: 10, 
}, 
addButtonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold", 
}, 
modalContainer: { 
    flex: 1, 
    padding: 50, 
    backgroundColor: "white", 
}, 
input: { 
    borderWidth: 1, 
    borderColor: "#E0E0E0", 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
}, 
contentInput: { 
    borderWidth: 1, 
    borderColor: "#E0E0E0", 
    padding: 10, 
    marginBottom: 20, 
    borderRadius: 5, 
    height: 150, 
    textAlignVertical: "top", 
}, 
buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
}, 

})

export default App;