import { Tooltip } from "@fluentui/react-components";
import TooltipContent from "./TooltipContent";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { Course } from "../../types/Degree.types";

export default function CheckboxOption( {course,selectedCourses, setSelectedCourses}: {
    course: Course, 
    selectedCourses: string[], 
    setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const classes = useStyles();
    const addCourse = (courseCode: string) => (
        setSelectedCourses( (prev) => [
            ...prev,
            courseCode
        ])
    )

    const removeCourse = (courseCode: string) => (
        setSelectedCourses((prev) => prev.filter( (course) => course !== courseCode))
    )

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? addCourse(e.target.value) : removeCourse(e.target.value);
    }
    
    return(
        <Tooltip key={course.code} content={<TooltipContent {...course} />} relationship="label" withArrow>
            <div className={classes.checkboxOption}>
                <input 
                    type="checkbox" 
                    onChange={handleCourseChange} 
                    checked={selectedCourses.includes(course.code)} 
                    value={course.code} 
                    name={course.code} 
                    id={course.code} />
                <label 
                    htmlFor={course.code} 
                    className={classes.checkboxLabel}
                >
                    {course.code} - {course.name}
                </label>
            </div> 
        </Tooltip>
    )
}