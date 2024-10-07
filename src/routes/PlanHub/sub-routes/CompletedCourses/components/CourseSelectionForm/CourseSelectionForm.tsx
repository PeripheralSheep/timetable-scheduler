import { Link } from "react-router-dom";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxField from "./CheckboxField";
import type { Filter } from "../../types/FilterTypes.types";
export default function CourseSelectionForm({filters} : {filters: Filter}) {
    const classes = useStyles();
    
    return (
        <div className={classes.form}>
            <CheckboxField 
                filters={filters} 
            />
            <div>
                <Link
                    to=".."
                    className={classes.submitButton}
                >
                    Back
                </Link>
                <Link
                    to="../make-plan"
                    className={classes.submitButton}
                >
                    Make Course Plan
                </Link>
            </div>
            
        </div>
    )
}