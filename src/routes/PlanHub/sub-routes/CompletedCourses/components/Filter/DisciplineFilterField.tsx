import { useStyles } from "../../styles/CompletedCourses.classNames";

export default function DisciplineFilterField() {
    const classes = useStyles();
    return (
        <div className={classes.filterField}>
            <label htmlFor="">Discipline</label>
            <select name="" id="">
                <option value="">MATH</option>
            </select>
        </div>
    )
}