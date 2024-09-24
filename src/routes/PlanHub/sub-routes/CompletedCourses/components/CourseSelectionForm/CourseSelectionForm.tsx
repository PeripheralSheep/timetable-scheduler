import { Form } from "react-router-dom";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxField from "./CheckboxField";
import type { Filter } from "../../types/FilterTypes.types";

export default function CourseSelectionForm({filters} : {filters: Filter}) {
    const classes = useStyles();
    
    return (
        <Form className={classes.form}>
            <CheckboxField 
                filters={filters} 
            />
            <button 
                type="submit" 
                className={classes.submitButton}
            >
                Make Course Plan
            </button>
        </Form>
    )
}