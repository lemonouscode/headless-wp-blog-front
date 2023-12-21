import { useParams } from "react-router-dom";
import { useCategoryBySlug } from "../hooks/useCategoryBySlug";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material"
import { ListPosts } from "../components/ListPosts";

export const Category = () => {

  const { slug } = useParams();

  const {error, loading, data,categoryName, refetch} = useCategoryBySlug(slug);

  useEffect(()=>{   
    refetch();
  },[slug])

  return (
    <div>
      <Container>
        <Typography gutterBottom sx={{ mt:"60px" }} align="center" variant="h1">Category Posts: {categoryName&& categoryName}</Typography>
        <ListPosts data={data} />
      </Container>
    </div>
  )
}
