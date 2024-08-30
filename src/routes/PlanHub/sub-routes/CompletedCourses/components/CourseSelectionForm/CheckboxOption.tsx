import { Tooltip } from "@fluentui/react-components";
import TooltipContent from "./TooltipContent";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { Course } from "./types/Course";

export default function CheckboxOption( {course}: {course: Course}) {
    const classes = useStyles();
    
    return(
        <Tooltip key={course.code} content={<TooltipContent {...course} />} relationship="label" withArrow>
            <div className={classes.checkboxOption}>
                <input type="checkbox" value={course.code} name={course.code} id={course.code} />
                <label htmlFor="COMP2220" className={classes.checkboxLabel}>{course.code} - {course.name}</label>
            </div> 
        </Tooltip>
    )
}