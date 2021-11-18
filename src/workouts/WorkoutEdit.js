import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Model, ModelHeader, ModelBody, Input, ButtonDropdown} from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);
    const workoutToUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:3000/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return(
        <Model isOpen={true}>
            <ModelHeader>Log a Workout</ModelHeader>
            <ModelBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label cmdhtmlFor="result">Edit Result:</Label>
                        <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edt Description:</Label>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition">Edit Definition</Label>
                        <Input type="select" name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option></option>
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update the workout!</Button>
                </Form>
            </ModelBody>
        </Model>
    )
}

export default WorkoutEdit;