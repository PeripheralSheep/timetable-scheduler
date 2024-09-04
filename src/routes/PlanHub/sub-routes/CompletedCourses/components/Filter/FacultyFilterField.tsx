import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { FilterState } from "../../types/FilterTypes.types";

export default function FacultyFilterField({filters, setFilters} : FilterState) {
    const classes = useStyles();
    const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prev) => ({
            ...prev,
            faculty: e.target.value.trim()
        })
    )}
    return (
        <div className={classes.filterField}>
            <label htmlFor="faculty-select">Faculty</label>
            <select onChange={handleFacultyChange} defaultValue={filters.faculty} name="faculty-select" id="faculty-select">
                <option value="FST">Science and Technology</option>
            </select>
        </div>
    )
}