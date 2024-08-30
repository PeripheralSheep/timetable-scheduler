import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxOption from "./CheckboxOption";
import type { Course } from "./types/Course";
export default function CheckboxField() {
    const classes = useStyles();
    const courseList: Course[]  = [
        {
            code: "COMP3320",
            name:"Design Principles for Operating Systems",
            credits: 3,
            prerequisites: ['COMP2220']
        },
        {
            code: "FOUN1301",
            name:"Law, Governance, Society and Economy in the Caribbean",
            credits: 3,
        },
        {
            code: "MATH3590",
            name:"Mathematics Research Project",
            credits: 3,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
    ]
    return(
        <div className={classes.checkField}>
            {courseList.map( (course) => <CheckboxOption key={course.code} course={course}/>)}
        </div>
    )
}