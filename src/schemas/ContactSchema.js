import * as yup from "yup"

export const ContactSchema = () => {
    return yup.object().shape({
        fName: yup.string().min(2).required("Required"),
        lName: yup.string().min(2).required("Required"),
        email: yup.string().email("Please enter a valid email").required("Required"),
        message: yup.string().min(5).required("Required"),
      });
}