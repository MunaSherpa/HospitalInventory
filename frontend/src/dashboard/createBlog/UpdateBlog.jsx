import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from '@mui/material';
import imagePlaceholder from "../../assets/image.png";
import { AddCircle as Add } from '@mui/icons-material';
import axios from 'axios';
import Nav from '../Nav';
import Sidenav from '../Sidenav';

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

const UpdateBlog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(initialBlogData);
    const [file, setFile] = useState('');
    const [isModified, setIsModified] = useState(false); // State to track if blog data is modified
//     const [newBlogData, setnewBlogData] = useState({
//         title: blogData.title,
//         description: blogData.description
// });

    useEffect(() => {
        const fetchBlog = async () => {
            console.log(id)
            try {
                const response = await axios.get(`http://localhost:3001/singleBlog/${id}`);
                const { title, description, image } = response.data;
                setBlogData({ title, description, image });
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
        setIsModified(true); // Set isModified to true when blog data is changed
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBlogData(prevState => ({
                ...prevState,
                image: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        setIsModified(true); // Set isModified to true when blog data is changed
    };

    const handlePublish = async () => {
        console.log(handlePublish)

        console.log(id);
        console.log(blogData.title);
        console.log(blogData.description);
        // console.log(formData);

        console.log(newBlogData);

        var title = blogData.title;
         var image = "uploads/1711748714755-image1.png";
        var description = blogData.description;
        var createdDate = new Date().toString();

        console.log(title);
        console.log(image);
        console.log(description);
        console.log(createdDate);

        try {
            


            var res = await axios.post(`http://localhost:3001/singleBlog/${id}/update`,  newBlogData, {
            // var res = await axios.post(`http://localhost:3001/singleBlog/${id}/update`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res)
            setIsModified(false); // Reset isModified to false after successful update
            // Redirect or perform other actions upon successful update
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <>
            <Nav />
            <Box height={30} />
            <Sidenav />
            <Container>
                {/* <Image src={image} alt='image' /> */}
                {/* <Image src={blogData.image || image} alt='image' /> */}
                <Image src={imagePlaceholder} alt='image' />

                {/* {blogData.image ? (
                    <Image src={blogData.image} alt='image' />
                ) : (
                    <Image src={imagePlaceholder} alt='image placeholder' />
                )} */}

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
                    <Button type="submit" color="primary" onClick={handlePublish}>{isModified ? 'Save' : 'Update'}</Button> {/* Change button text based on isModified state */}
                </StyledFormControl>

                <Textarea
                    // rowsMin={5}
                    rowsmin={5}
                    placeholder="Description"
                    name='description'
                    onChange={handleChange}
                    value={blogData.description}
                />
            </Container>
        </>
    );
}

export default UpdateBlog;
