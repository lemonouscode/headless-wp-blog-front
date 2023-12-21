import { Button, Typography, Grid, Card, CardMedia, CardContent, CardActions, Skeleton } from "@mui/material"
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

export const ListPosts = ({data, token, handleRemovePost, loading}) => {
  return (
    <div>
        <Grid container spacing={2} alignItems="stretch">
          
          {loading ? 
            (
              Array.from({ length: 6 }).map((_, index) => (
                <Grid sx={{ mt: "40px" }} key={index} item xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%", justifyContent: "space-between", display: "flex", flexDirection: 'column' }}>
                    <Skeleton height="140px" variant="rectangular" />
                    <CardContent>
                      <Skeleton height="32px" variant="rectangular" />
                      <Skeleton height="60px" variant="rectangular" />
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Skeleton height="30px" variant="rectangular" />
                      <Skeleton height="30px" variant="rectangular" />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )
          :
            <>
              {data && data.map((element,index)=>(
                <Grid sx={{ mt:"40px" }} key={index} item xs={12} sm={6} md={4} >
                    <Card sx={{ bgcolor: "#D4CDC1", height:"100%", justifyContent:"space-between", display:"flex", flexDirection:'column' }}>
                      <CardMedia 
                        image={element.featuredImage?.node.sourceUrl}
                        sx={{ height:"140px" }}
                      />
                      <CardContent>
                        <Typography variant="h5" gutterBottom>{element.title}</Typography>
                        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(element.content.slice(0, 150)) }} />
                      </CardContent>
                      <CardActions sx={{ display:"flex", justifyContent:"space-between" }}>
                        <Link to={`/post/${element.slug}`}>
                          <Button variant='contained' size="small" color='secondary'>Read More</Button>
                        </Link>
                        {element?.categories?.nodes[0].slug && 
                          <Link to={`/category/${element.categories?.nodes[0]?.slug}`}>
                              <Button variant='outlined' color='secondary'>{element.categories?.nodes[0]?.slug}</Button>
                          </Link>
                        }
                      </CardActions>
                    </Card>
                    {token &&
                      <Button sx={{ mt:"5px" }} color="secondary" variant="outlined"
                        onClick={()=>handleRemovePost(element.id)}
                        >Remove Post
                      </Button>
                    }
                  </Grid>
              ))}
            </>
          }

          
        </Grid>
    </div>
  )
}
