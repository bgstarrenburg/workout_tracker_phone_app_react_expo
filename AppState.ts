export type AppDataState = {
    metricSystem: "Metric",
    workouts: Workout[],
}

export type Workout = {
    title: string,
    pageId: number,
    exercises: Exercise[],
}

export type Exercise = {
    title: string,
    pageId: number,
    description: string,
    records: Rep[],
}

export type Rep = {
    amount: number,
    weight: number,
}

export const initialData: AppDataState = {
    metricSystem: "Metric",
    workouts: [ ]
}

export function generateWorkoutPageId(workouts: Workout[]): number {
    let newId: number = 0
    workouts.map(_w => {
        newId += 1
    }) 
    return newId;
}

export function generateExercisePageId(workouts: Workout[]): number {
    let newId: number = 0
    workouts.map(_w => {
        _w.exercises.map(_ => {
            newId += 1
        })
    }) 
    return newId;
}