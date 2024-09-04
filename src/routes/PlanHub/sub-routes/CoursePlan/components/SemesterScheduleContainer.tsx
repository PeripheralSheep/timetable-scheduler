import { useState } from "react";
import { useStyles } from "../styles/coursePlan.classNames";
import NewSemesterButton from "./NewSemesterButton";
import SemesterScheduleCard from "./SemesterScheduleCard";
import type { Course, CourseSemester } from "../../CompletedCourses/types/Degree.types";

export default function SemesterScheduleContainer() {
    const classes = useStyles();
    const [semesters, setSemesters] = useState<CourseSemester[]>([
        {
            year: 2024,
            maxCredits: 18,
            semesterNumber: 1,
            courseList: []
        },
        {
            year: 2024,
            maxCredits: 18,
            semesterNumber: 2,
            courseList: []
        }
    ]);
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
            credits: 6,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
        {
            code: "COMP3330",
            name:"Algorithms",
            credits: 3,
            prerequisites: ['COMP2220']
        },
        {
            code: "COMP3310",
            name:"Database Management Systems 1",
            credits: 3,
        },
        {
            code: "MATH3550",
            name:"Metric Spaces",
            credits: 3,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
    ]
    const selectableCourses = courseList.filter((course) => !semesters.some((semester) => semester.courseList.some((usedCourses) => usedCourses?.code === course.code)))
    return (
        <div className={classes.semesterScheduleContainer}>
                <NewSemesterButton />
                {semesters.map( (semester) => <SemesterScheduleCard semester={semester} setSemesterCourseList={setSemesters} availableCourses={selectableCourses}/> ) }
                <button>+</button>
                <NewSemesterButton />
            </div>
    )
}