import { Button, TextField, Box, Typography, Container } from "@mui/material"
import { useContactFormMutation } from "../hooks/useContactFormMutation"
import { useFormik } from "formik"
import { ContactSchema } from "../schemas/ContactSchema";
import { useState } from "react";
import "../assets/styles/contactStyles.css"

export const Contact = () => {

  const { createSubmitFormEntry, loading, error } = useContactFormMutation();
  const [submited, setSubmited] = useState(null);

  const {values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues:{
      fName:"",
      lName:"",
      email:"",
      message:""
    },
    validationSchema: ContactSchema,
    onSubmit: async (values)=>{
      console.log(values)

      const response = await createSubmitFormEntry(values);
      setSubmited(response.submitGfForm.confirmation.message);

    }
  })

  return (
    <Container sx={{ minHeight:"calc(100vh - 250px)" }}>
        {!submited ?
        <form style={{ width:"70%", marginLeft:"auto", marginRight:"auto", marginTop:"60px" }} onSubmit={handleSubmit}>
          
          <Typography variant="h3" sx={{ mt:"60px" }} gutterBottom>We Would Love To Hear From You</Typography>
          <Typography variant='h6' gutterBottom sx={{ maxWidth:"650px"}}>Send Us A Message, Don't Be Shy 😉</Typography>
          
          <Box sx={{ width:"100%", display:"flex", gap:"20px", mt:"40px" }}>
            <TextField
              fullWidth
              id="fName"
              name="fName"
              label="First Name"
              value={values.fName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fName && Boolean(errors.fName)}
              helperText={touched.fName && errors.fName}
            />
            <TextField
              fullWidth
              id="lName"
              name="lName"
              label="Last Name"
              type="lName"
              value={values.lName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lName && Boolean(errors.lName)}
              helperText={touched.lName && errors.lName}
            />
          </Box>
          <TextField
            sx={{ mb:"20px", mt:"20px" }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            multiline
            rows={6}
            fullWidth
            id="message"
            name="message"
            label="Message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt:"20px" }}>
            Submit
          </Button>
        </form>
        :
          <Box sx={{ mt:"60px", display:"flex", flexDirection:"column", gap:"15px" }}>
            <Typography sx={{ mt:"20px", color:"green" }} align='center' variant='h4' gutterBottom>
              Message Has Been Sent!
            </Typography>
            <Typography sx={{ color:"black" }} align='center' variant='h6' gutterBottom>
              Thank You For Contacting Us
          </Typography>
          </Box>
        }
    </Container>
  )
}
