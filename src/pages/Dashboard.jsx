import { Container, Box, Typography,TextField, Button } from '@mui/material';
import { useState } from 'react';
import { CreatePostSchema } from '../schemas/CreatePostSchema';
import { useFormik } from "formik"
import { useCreatePostMutation } from '../hooks/useCreatePostMutation';
import { usePosts } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

export const Dashboard = () => {

  const {createPost} = useCreatePostMutation();
  const [postStatus, setPostStatus] = useState("");

  const {data, refetch} = usePosts();

  const {values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues:{
      title:"",
      content:""
    },
    validationSchema: CreatePostSchema,
    onSubmit: async (values)=>{

      await createPost(values.title, values.content);
      refetch();
      setPostStatus("Post created successfully!");
    }

  })

  return (
    <div>
      <Container>
        <Box sx={{ mt:"60px" }}>
          <Typography align='center' variant='h1' gutterBottom>Admin Dashboard</Typography>
          <Typography sx={{ mt:"40px" }} align='center' variant='h4' gutterBottom>Create Post</Typography>

          <form style={{ maxWidth:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"60px" }} onSubmit={handleSubmit}>
          <TextField
            sx={{ mb:"20px" }}
            fullWidth
            id="title"
            name="title"
            label="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            multiline
            rows={6}
            fullWidth
            id="content"
            name="content"
            label="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && Boolean(errors.content)}
            helperText={touched.content && errors.content}
          />

          <Button sx={{ mt:"20px" }} color="primary" variant="contained" fullWidth type="submit">
            Create Post
          </Button>
        </form>

        {postStatus &&
            <Typography sx={{ mt:"20px", color:"green" }} align='center' variant='body1' gutterBottom>
              {postStatus}
            </Typography>
        }

        <Typography sx={{ mt:"40px" }} align='center' variant='body1' gutterBottom>
          Want More Admin Options? Login to: <Link to={import.meta.env.VITE_SERVER_URL + "/wp-admin"}>Wordpress Backend Dashboard</Link>
        </Typography>

        </Box>
      </Container>
    </div>
  )
}
