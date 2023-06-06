import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttendance, editAttendance} from '../Service/api';

const initialValue = {
    name: '',
    username: '',
   attendance: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditAttendance = () => {
    const [user, setUser] = useState(initialValue);
    const { name, username, attendance} = user;
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadAttendanceDetails();
    }, []);

    const loadAttendanceDetails = async() => {
        const response = await getAttendance(id);
        setUser(response.data);
    }

    const editAttendanceDetails = async() => {
        const response = await editAttendance(id, user);
        navigate('/all');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Attendance</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='attendance' value={attendance} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
           
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editAttendanceDetails()}>Edit Attendance</Button>
            </FormControl>
        </Container>
    )
}

export default EditAttendance;