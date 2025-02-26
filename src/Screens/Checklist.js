import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Keyboard} from 'react-native';
import Task from "../components/checklist/Task.js"
import BasePath from '../constants/BasePath'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import StorageUtils from '../Utils/StorageUtils.js';

export default function Checklist() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [user,setUser]=useState(null)
    useEffect(()=>{
        console.log('check_list')
        refresh()

    },[])
    const refresh=()=>{
        StorageUtils.retrieveData('user')
        .then(res=>{
            var x=JSON.parse(res)
            console.log(x)
            setUser(x)
            var obj={
                id:x.id,
            }
            console.log(obj);
            axios.post(BasePath+'/api/sp/select',obj)
            .then(res=>{
                console.log(res.data)
                setTaskItems(res.data)
        setTask(null);
            })
        })
    }
    const handleAddTask = () => {
        var obj={
            user_id:user.id,
            todos:task
        }

        axios.post(BasePath+'/api/sp/addinChecklist',obj)
        .then(res=>{console.log(res.data)
            refresh()
        }
        )
        Keyboard.dismiss();
        
    }

    const completeTask = (index) => {
        axios.delete(BasePath+'/api/sp/deleteTask/'+index)
        .then(res=>{
            console.log(res.data);
            refresh()
        })
        // itemsCopy.splice(index, 1):
        // setTaskItems(itemsCopy)
    }

    return (
        <View style={styles.container}>

            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>wedding's tasks</Text>

                <View style={styles.items}>
                    {taskItems && taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => completeTask(item.id)}>
                                <Task  item={item}/>
                            </TouchableOpacity>
                        ) 
                    })
                    }

                    {/* <Task text={'task 1'} />
                    <Task text={'task 2'} /> */}
                </View>

            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'write a task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={handleAddTask}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D49B35',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})