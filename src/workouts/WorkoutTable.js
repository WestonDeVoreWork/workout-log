import React from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable = (props) => {
    
    const deleteWorkout = (workout) => {
        fetch(`http://localhost:3000/log/${workout.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then(() => props.fetchWorkouts())
    }
    
    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        <Button color="warning">Update</Button>
                        <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    
    return(
        <>
        <hr>Workout History</hr>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Result</th>
                    <th>Description</th>
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </Table>
        </>
    )
}

export default WorkoutTable;