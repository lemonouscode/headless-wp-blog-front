import { Button, TextField, Container,Typography } from "@mui/material"
import { useFormik } from "formik"
import { loginSchema } from "../schemas/LoginSchema"
import { useLoginMutation } from "../hooks/useLoginMutation"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { TokenContext } from "../context/TokenContext"

export const Login = () => {

  const {login, loading, error} = useLoginMutation()
  const navigate = useNavigate();
  const {setToken} = useContext(TokenContext);


  const {values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues:{
      username:"",
      password:""
    },
    validationSchema: loginSchema,
    onSubmit: async (values)=>{

      const token = await login(values.username, values.password)

      if(token){
        localStorage.setItem('jwt_token', token);
        setToken(token)
        navigate('/dashboard', true);
      } 
    }
  })

  return (
    <Container sx={{ minHeight:"calc(100vh - 250px)" }}>
        <Typography sx={{ mt:"60px" }} variant="h1" align='center' gutterBottom>Login</Typography>
        <form style={{ maxWidth:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"60px" }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
    </Container>
  )
}
