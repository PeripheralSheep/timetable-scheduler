import { useStyles } from "./styles/CompletedCourses.classNames";
import Filter from "./components/Filter/Filter";
import CourseSelectionForm from "./components/CourseSelectionForm/CourseSelectionForm";

export default function CompletedCourses() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <h2>Choose Completed Courses</h2>
            <Filter />
            <CourseSelectionForm />
        </ div>
    )
}