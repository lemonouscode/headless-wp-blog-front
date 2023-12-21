import * as yup from "yup"

export const CreatePostSchema = () => {
    return yup.object().shape({
        title: yup.string().min(3).required("Title is required")
      });
}