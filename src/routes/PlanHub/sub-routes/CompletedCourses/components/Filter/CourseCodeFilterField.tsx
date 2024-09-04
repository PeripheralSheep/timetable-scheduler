import type { ChangeEvent } from "react";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { FilterState } from "../../types/FilterTypes.types";

export default function CourseCodeFilterField({filters, setFilters} : FilterState) {
    const classes = useStyles();
    const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            code: e.target.value
        })
    )}
    return (
        <div className={classes.filterField}>
            <label htmlFor="code-input">Code</label>
            <input onChange={handleCodeChange} value={filters.code} name="code-input" id="code-input" type="text"/>
        </div>
    )
}