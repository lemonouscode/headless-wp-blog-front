import { useEffect } from "react";
import { usePostsBySlug } from "../hooks/usePostBySlug"
import { useCategoryBySlug } from "../hooks/useCategoryBySlug";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Box, Skeleton } from '@mui/material';
import DOMPurify from "dompurify";
import { ListRelatedPosts } from "../components/ListRelatedPosts";

export const SinglePost = () => {

  const { slug } = useParams();
  
  const {error, loading, data, refetch} = usePostsBySlug(slug);  

  const {data:relatedPosts} = useCategoryBySlug(data?.categories.nodes[0].slug);

  const filtered = relatedPosts?.filter((post) => post.slug != slug );

  useEffect(()=>{
    refetch();
  },[slug])


  return (
    <div>

      {loading ?
        
        <Skeleton sx={{ 
          backgroundPosition:"center",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          position:"relative"
          }}
          height="50vh"
          >
            <Skeleton sx={{ zIndex:"1", width:"40%" }} variant="rectangular" />
          </Skeleton>
      :
        <>
          {data &&
              <Box sx={{ backgroundImage: `url(${data?.featuredImage?.node.sourceUrl})`, 
                height:"50vh", 
                backgroundSize:"cover", 
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                position:"relative"
                }}
                >
                  <Box sx={{ width:"100%", height:"100%", background:"black", position:"absolute", opacity:"0.5" }} />
                  <Typography sx={{ zIndex:"1" }} variant="h1" color="white" align='center' gutterBottom>{data && data.title}</Typography>
                </Box>
            }
        </>
      }

      
      <Container>
          <Grid container spacing={6} sx={{ mt:"0px" }}>
            <Grid item lg={8} md={12} >
              <Box>
                <Typography variant="h4" gutterBottom>{data && data.title}</Typography>
                <Typography color="text.secondary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data && data.content) }} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} >
              <Typography variant="h5" gutterBottom>Related Posts:</Typography>
              <ListRelatedPosts filtered={filtered} />
            </Grid>
          </Grid>
      </Container>
    </div>
  )
}
