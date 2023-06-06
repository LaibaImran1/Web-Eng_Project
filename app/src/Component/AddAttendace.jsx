import react, { useState } from 'react';

import { addAttendance } from '../Service/api';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    username: '',
    attendance: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddAttendance = () => {
    const [user, setUser] = useState(initialValue);
    const { name, username, attendance } = user;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addAttendanceDetails = async() => {
        await addAttendance(user);
        navigate('/all');
    }

    return (
        <Container>
            <Typography variant="h4">Add Attendance</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Attendance</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='attendance' value={attendance} id="my-input"/>
            </FormControl>
           
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addAttendanceDetails()}>Add Attendance</Button>
            </FormControl>
        </Container>
    )
}

export default AddAttendance;