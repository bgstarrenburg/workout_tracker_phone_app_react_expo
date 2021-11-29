import React from "react"
import { View, Text, Button } from "react-native"
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Workout } from "../../AppState";

type workoutsPageProps = {
    route: RouteProp<ParamListBase, "workouts">,
    navigation: any,
    workouts: Workout[],
    addWorkout: (_: string) => void,
    removeWorkout: (_: number) => void,
}

export const WorkoutsOverview = (props: workoutsPageProps) => {
    return (
        <>
        {props.workouts.map((workout, index) => 
            <div key={index}>
                <Text>{workout.title}</Text>
                <span>
                <Button
                    title={"go to exercises in workout: " + workout.title}
                    onPress={() => props.navigation.navigate("w" + workout.pageId.toString())}
                />
                <Button 
                    title={"Remove Workout"}
                    onPress={() => props.removeWorkout(workout.pageId)}
                />
                </span>
            </div>
        )}
        <Button 
            title={"Add New Workout"}
            onPress={() => props.addWorkout("new workout")}
        />
        
        </>
    )
}