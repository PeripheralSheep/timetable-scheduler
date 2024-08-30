import { Form } from "react-router-dom";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxField from "./CheckboxField";
export default function CourseSelectionForm() {
    const classes = useStyles();
    return (
        <Form className={classes.form}>
            <CheckboxField />
            <button type="submit" className={classes.submitButton}>Make Course Plan</button>
        </Form>
    )
}