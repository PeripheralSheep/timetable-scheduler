import { useState } from "react";
import { useStyles } from "./styles/CompletedCourses.classNames";
import Filter from "./components/Filter/Filter";
import CourseSelectionForm from "./components/CourseSelectionForm/CourseSelectionForm";
import type { Filter as FilterType } from "./types/FilterTypes.types";

export default function CompletedCourses() {
    const classes = useStyles();
    const [filters, setFilters] = useState<FilterType>({
        code: "",
        levels: "ALL",
        faculty: "ALL",
        discipline: "ALL"
    });
    console.log(filters);
    return (
        <div className={classes.outerCard}>
            <h2>Choose Completed Courses</h2>
            <Filter setFilters={setFilters} filters={filters}/>
            <CourseSelectionForm filters={filters}/>
        </ div>
    )
}