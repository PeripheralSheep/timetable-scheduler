import { Tooltip } from "@fluentui/react-components";
import TooltipContent from "./TooltipContent";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import type { Course } from "../../../../../../types/course.types";
import type { DispatcherType } from "../../../../types/StateProps.types";
import type { CourseCode } from "../../../../../../types/course.types";

export default function CheckboxOption( {course,selectedCourses, setSelectedCourses}: {
    course: Course, 
    selectedCourses: Set<CourseCode>, 
    setSelectedCourses: DispatcherType<Set<CourseCode>>
}) {
    const classes = useStyles();
    
    const addCourse = (courseCode: CourseCode) => (
        setSelectedCourses( (prev) => new Set(prev.add(courseCode)))
    )

    const removeCourse = (courseCode: CourseCode) => (
        setSelectedCourses((prev) => {
            prev.delete(courseCode)
            return new Set(prev);
        })
    )

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? addCourse(e.target.value as CourseCode) : removeCourse(e.target.value as CourseCode);
    }
    
    return(
        <Tooltip key={course.code} content={<TooltipContent {...course} />} relationship="label" withArrow>
            <div className={classes.checkboxOption}>
                <input 
                    type="checkbox" 
                    onChange={handleCourseChange} 
                    checked={selectedCourses.has(course.code)} 
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