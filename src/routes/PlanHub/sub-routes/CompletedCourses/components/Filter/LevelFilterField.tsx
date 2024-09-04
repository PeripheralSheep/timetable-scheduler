import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { FilterState } from "../../types/FilterTypes.types";

export default function LevelFilterField({filters, setFilters} : FilterState) {
    const classes = useStyles();
    const levels = ["0","1","2","3"];

    const addLevel = (level: string) => (
        setFilters((prev) => {
            if(typeof prev.levels === "string") {
                return {
                    ...prev,
                    levels: [level]
                }
            }
            else {
                return {
                    ...prev,
                    levels: [...prev.levels,level]
                }
            }
        })
    );

    const removeLevel = (level: string) => (
        setFilters((prev) => {
            if(typeof prev.levels !== "string") {
                const newLevels = prev.levels.filter((curLevel) => curLevel !== level)
                return {
                    ...prev,
                    levels: newLevels.length === 0 ? "ALL" : newLevels
                }
            }
            else
                return prev
        })
    )

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked ? addLevel(e.currentTarget.value) : removeLevel(e.currentTarget.value);
    }
    return (
        <div className={classes.filterField}>
            <label>Level</label>
            <span className={classes.levelCheckboxes}>
                {levels.map( (level) => (
                    <span key={level} className={classes.levelCheckbox}>
                        <input onChange={handleLevelChange} id={level} name={level} value={level} type="checkbox" />
                        <label htmlFor={level}>{level}</label>
                    </span>
                ))}
            </span>
        </div>
    )
}