import { Container, Typography } from '@mui/material';
import { usePosts } from '../hooks/usePosts';
import { ListPosts } from '../components/ListPosts';
import { useRemovePostMutation } from '../hooks/useRemovePostMutation';
import { useContext } from "react";
import { TokenContext } from '../context/TokenContext';

export const Home = () => {

  const {error,loading,data, refetch} = usePosts();
  const {removePost} = useRemovePostMutation();

  const handleRemovePost = async (id)=>{
    await removePost(id);
    refetch()
  }

  const {token} = useContext(TokenContext)

  return (
    <>
      <Container sx={{ minHeight:"calc(100vh - 250px)" }}>
        <Typography sx={{ mt:"60px" }} variant="h1" align='center' gutterBottom>Recent Posts</Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ maxWidth:"650px", mx:"auto" }} align='center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non impedit deserunt libero id optio, aperiam cupiditate quis quaerat consequuntur blanditiis sapiente! Labore mollitia perspiciatis quam facilis doloremque aliquam in ad sit libero minus alias aut obcaecati, blanditiis aperiam dolorem ducimus.</Typography>
        <ListPosts data={data} token={token} handleRemovePost={handleRemovePost} loading={loading} />
      </Container>
    </>
  )
}
