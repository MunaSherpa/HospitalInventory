import React, { useState } from 'react';
import Nav from '../Nav';
import Sidenav from '../Sidenav';
import { Button, TextareaAutosize, Box, styled, FormControl, InputBase } from '@mui/material';
import image from "../../assets/image.png"
import { AddCircle as Add } from '@mui/icons-material';
import axios from 'axios'; // Import axios for making HTTP requests

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialBlogData = {
    title: '',
    description: '',
    image: '',
};

const CreateBlog = () => {
    const [blogData, setBlogData] = useState(initialBlogData);
    const [file, setFile] = useState('');

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBlogData(prevState => ({
                ...prevState,
                image: reader.result, // Save the image data URL
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', blogData.title);
            formData.append('description', blogData.description);
            formData.append('createdDate', new Date());

            await axios.post('http://localhost:3001/createBlog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Reset form fields after successful submission
            setBlogData(initialBlogData);
            setFile('');
        } catch (error) {
            console.error('Error publishing blog:', error);
            // Handle error, show error message to the user
        }
    };

    return (
        <>
            <Nav />
            <Box height={30} />
            <Sidenav />
            <Container>
                <Image src={image} alt='image' />

                <StyledFormControl>
                    <label htmlFor='fileInput'>
                        <Add fontSize='large' color='action' />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ position: 'absolute', left: '-9999px' }}
                        onChange={handleImageChange}
                    />
                    <InputTextField onChange={handleChange} name='title' placeholder="Title" value={blogData.title} />
                    <Button color="primary" onClick={handlePublish}>Publish</Button>
                </StyledFormControl>

                <Textarea
                    rowsMin={5}
                    placeholder="Description"
                    name='description'
                    onChange={handleChange}
                    value={blogData.description}
                />
            </Container>
        </>
    );
}

export default CreateBlog;
