import {  Button, Typography, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export const ListRelatedPosts = ({filtered}) => {
  return (
    <Grid container spacing={4}>
        {filtered && filtered.map((element, index)=> (
            <Grid key={index} item lg={12} sm={6} xs={12}>
                <Card sx={{ bgcolor: "#D4CDC1", height:"100%", justifyContent:"space-between", display:"flex", flexDirection:'column' }}>
                    <CardMedia 
                        image={element.featuredImage.node.sourceUrl}
                        sx={{ height:"100px" }}
                    />
                    <CardContent>
                        <Typography variant="body1">{element.title}</Typography>
                    </CardContent>
                    <CardActions sx={{ display:"flex", justifyContent:"space-between" }}>
                        <Link to={`/post/${element.slug}`}>
                            <Button variant='contained' size="small" color='secondary'>Read More</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
  )
}
