import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, CardMedia, styled } from '@mui/material';
import axios from 'axios';
import Nav from '../Nav';
import Sidenav from '../Sidenav';
import Footer from '../../footer/Footer';
import {Edit, Delete} from '@mui/icons-material';
import {Link} from 'react-router-dom';




const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 2px;
    border: 1px solid #878787;
    border-radius: 5px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 2px;
    border: 1px solid #878787;
    border-radius: 5px;
`;


const PostBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/allBlogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                // Handle error, show error message to the user
            }
        };

        fetchBlogs();
    }, []); // Empty dependency array ensures that this effect runs only once after the component mounts


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/singleBlog/${id}/delete`);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
            // Handle error, show error message to the user
        }
    };

    return (
        <>
            <Nav />
            <Box height={30} />
            <Sidenav />
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    paddingTop: 20,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Blog - Let's Talk Health
                </Typography>

                <Grid container justifyContent="center" spacing={2}>
                    {blogs.map(blog => (
                        <Grid item key={blog._id} xs={12} sm={6}>
                            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`http://localhost:3001/${blog.image}`}
                                    alt="Blog Image"
                                    style={{ objectFit: 'cover' }}
                                />
                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Link to={`/dashboard/updateBlog/${blog._id}`}> <EditIcon color='primary'/> </Link>
                                    <DeleteIcon color='error' onClick={() => handleDelete(blog._id)} />
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {blog.createdDate}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        {blog.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box mt={4} />
            <Footer />
        </>
    );
};

export default PostBlogs;
