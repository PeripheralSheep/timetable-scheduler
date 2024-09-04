import { Form } from "react-router-dom";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxField from "./CheckboxField";
import type { Filter } from "../../types/FilterTypes.types";
import { useState } from "react";
export default function CourseSelectionForm({filters} : {filters: Filter}) {
    const classes = useStyles();
    const [selectedCourses, setSelectedCourses] = useState<Array<string>>([])
    return (
        <Form className={classes.form}>
            <CheckboxField filters={filters} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
            <button type="submit" className={classes.submitButton}>Make Course Plan</button>
        </Form>
    )
}