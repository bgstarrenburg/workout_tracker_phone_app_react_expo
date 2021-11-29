import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import React from "react"
import { View, Text, Button } from "react-native"
import { Exercise } from '../../AppState'

type exercisesPageProps = {
    route: RouteProp<ParamListBase, string>,
    navigation: any,
    exercises: Exercise[],
    addExercise: (_: string) => void,
    removeExercise: (_: number) => void,
}

export const ExercisesOverview = (props: exercisesPageProps) => {
    return (
        <>
        {props.exercises.map((exercise, index) =>
            <div key={index}>
            <Text>{exercise.title}</Text>
            <span>
                <Button
                    title={"go to exerciseDetail: " + exercise.title}
                    onPress={() => props.navigation.navigate("e" + exercise.pageId.toString())}
                />
                <Button 
                title={"Remove Exercise"}
                onPress={() => props.removeExercise(exercise.pageId)}
                />
            </span>
            </div>
        )}
        <Button 
            title={"Add New Exercise"}
            onPress={() => props.addExercise("new exercise")}
        />
        
        </>
    )
}