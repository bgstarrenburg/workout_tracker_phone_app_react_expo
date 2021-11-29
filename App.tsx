import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppDataState, Exercise, generateExercisePageId, generateWorkoutPageId, initialData, Workout } from './AppState';
import { ExerciseDetail } from './components/exerciseDetail/exerciseDetail';
import { ExercisesOverview } from './components/exercisesOverview/exercisesOverview';
import { clearStorage, isKeyInStorage, loadObject, saveObject } from './components/utils/asyncStorage';
import { WorkoutsOverview } from './components/workoutsOverview/workoutsOverview';

const Stack = createNativeStackNavigator()

export default class App extends React.Component<{}, {data: AppDataState}, {}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      data: initialData
    }
  }

  componentDidMount() {
    // clearStorage()
    isKeyInStorage("state").then(v => {
        if (v) {
          loadObject<AppDataState>("state")
          .then((value: AppDataState) => {
          console.log("appstate", value)
          this.setState({
            data: value
          })})
        }  
      }
    )
  }

  componentWillUnmount() {
    saveObject<AppDataState>("state", this.state.data)
  }
  
  render() {
    if (this.state != null)
      return (
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={"workouts"}>
                {props => 
                <WorkoutsOverview 
                  workouts={this.state.data.workouts} 

                  addWorkout={(title: string) => this.setState({...this.state, 
                    data: {...this.state.data,
                      workouts: this.state.data.workouts.concat(({
                        pageId: generateWorkoutPageId(this.state.data.workouts),
                        title: title,
                        exercises: [],
                      }))
                    }})}

                  removeWorkout={(id: number) => this.setState({...this.state,
                    data: {...this.state.data,
                      workouts: this.state.data.workouts.filter((workout: Workout) => workout.pageId != id)
                    }})}

                  {...props} />}
              </Stack.Screen>
              {this.state.data.workouts.map((workout: Workout, index: number) => 
                  <Stack.Screen key={index} name={"w" + workout.pageId.toString()}>
                    {props =>
                    <ExercisesOverview 
                      exercises={workout.exercises} 
                      
                      addExercise={(title: string) => this.setState({...this.state, 
                        data: {...this.state.data,
                          workouts: this.state.data.workouts.map(w => {
                            if (w.pageId == workout.pageId) {
                              return ({...w, exercises: w.exercises.concat({
                                title: title,
                                description: "desc",
                                pageId: generateExercisePageId(this.state.data.workouts),
                                records: [{amount: 10, weight: 20}, {amount: 8, weight: 25}]
                              })})
                            } else return w
                          })
                        }})}

                      removeExercise={(id: number) => this.setState({...this.state,
                        data: {...this.state.data,
                          workouts: this.state.data.workouts.map(w => {
                            if (w.pageId == workout.pageId) {
                              return ({...w, exercises: w.exercises.filter(w => w.pageId != id)})
                            } else return w
                          })
                        }})}

                      {...props}/>
                    }
                  </Stack.Screen>                           
              )}
              {this.state.data.workouts.map((workout: Workout, index: number) => workout.exercises.map((exercise: Exercise) => 
                <Stack.Screen key={index} name={"e" + exercise.pageId.toString()}>
                  {props => 
                    <ExerciseDetail 
                      exercise={exercise} 

                      changeTitle={(title: string, pageId: number) => this.setState({...this.state, 
                        data: {...this.state.data,
                          workouts: this.state.data.workouts.map(w => {
                            if (w.pageId == workout.pageId) {
                              return ({...w, exercises: w.exercises.map((exercise) => {
                                  if (exercise.pageId == pageId) return {...exercise, title: title}
                                  else return exercise
                                })
                            })} else return w
                          })
                        }})}

                        changeDescription={(descriptiom: string, pageId: number) => this.setState({...this.state, 
                          data: {...this.state.data,
                            workouts: this.state.data.workouts.map(w => {
                              if (w.pageId == workout.pageId) {
                                return ({...w, exercises: w.exercises.map((exercise) => {
                                    if (exercise.pageId == pageId) return {...exercise, description: descriptiom}
                                    else return exercise
                                  })
                              })} else return w
                            })
                          }})}
  

                      {...props}/>
                  }
                </Stack.Screen>
              ))}
            </Stack.Navigator>
        </NavigationContainer>
      )
    else {
      return <p>loading data</p>
    }
  }
}