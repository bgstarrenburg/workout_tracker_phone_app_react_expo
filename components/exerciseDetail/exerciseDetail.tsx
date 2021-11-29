import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import React from "react"
import { View, Text, TextInput } from "react-native"
import { Exercise } from '../../AppState'

type exercisesPageProps = {
    route: RouteProp<ParamListBase, string>,
    navigation: any,
    exercise: Exercise,
    changeTitle: (_1: string, _2: number) => void
    changeDescription: (_1: string, _2: number) => void
}

export const ExerciseDetail = (props: exercisesPageProps) => {
    return (
        <>
        <TextInput onChangeText={(s) => props.changeTitle(s, props.exercise.pageId)} value={props.exercise.title}/>
        <TextInput onChangeText={(s) => props.changeDescription(s, props.exercise.pageId)} value={props.exercise.description}/>
        {props.exercise.records.map((record, index) => 
            <div key={index}>
                <TextInput onChangeText={(s) => console.log(s)} value={record.amount.toString()}/> * <TextInput onChangeText={(s) => console.log(s)} value={record.weight.toString()}/>
            </div>
        )}
        </>
    )
}