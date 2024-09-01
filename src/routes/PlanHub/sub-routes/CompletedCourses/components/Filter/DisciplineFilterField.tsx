import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { FilterState } from "../../types/FilterTypes";

export default function DisciplineFilterField({filters, setFilters} : FilterState) {
    const classes = useStyles();
    const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prev) => ({
            ...prev,
            discipline: e.target.value.trim()
        })
    )}
    return (
        <div className={classes.filterField}>
            <label htmlFor="discipline-select">Discipline</label>
            <select onChange={handleDisciplineChange} name="discipline-select" id="discipline-select">
                <option value="ALL">ALL</option>
                <option value="MATH">MATH</option>
            </select>
        </div>
    )
}