import * as yup from "yup"

export const loginSchema = () => {
    return yup.object().shape({
        username: yup.string().min(3).required("Username is required"),
        password: yup.string().min(5).required("Password is required"),
      });
}