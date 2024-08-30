import { useStyles } from "../../styles/CompletedCourses.classNames";

export default function CourseCodeFilterField() {
    const classes = useStyles();
    return (
        <div className={classes.filterField}>
            <label htmlFor="">Code</label>
            <input type="number"/>
        </div>
    )
}