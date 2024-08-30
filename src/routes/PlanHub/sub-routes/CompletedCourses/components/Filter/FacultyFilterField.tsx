import { useStyles } from "../../styles/CompletedCourses.classNames";

export default function FacultyFilterField() {
    const classes = useStyles();
    return (
        <div className={classes.filterField}>
            <label htmlFor="">Faculty</label>
            <select name="" id="">
                <option value="">Science and Technology</option>
            </select>
        </div>
    )
}