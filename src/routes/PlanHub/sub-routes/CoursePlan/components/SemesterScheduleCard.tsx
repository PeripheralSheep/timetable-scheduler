import { useStyles } from "../styles/coursePlan.classNames";
import NewCourseButton from "./NewCourseButton";
import SemesterScheduleHeader from "./SemesterScheduleHeader";
import CourseSelectionSelect from "./CourseSelectionSelect";
import type { Course, CourseSemester } from "../../CompletedCourses/types/Degree.types";
export default function SemesterScheduleCard({ semester, availableCourses, setSemesterCourseList}:{semester:CourseSemester, availableCourses: Course[], setSemesterCourseList: React.Dispatch<React.SetStateAction<CourseSemester[]>>}) {
    const classes = useStyles();
    const selectedCourses = semester.courseList;
    const numCredits = selectedCourses?.reduce((sum, curCourse) => curCourse !== null ? sum + curCourse.credits : sum, 0);
    function addCourseSlot() {
        setSemesterCourseList( (semesters) => {
            return semesters.map((sem) => {
                if(sem.semesterNumber == semester.semesterNumber && sem.year == semester.year){
                    return ({
                        ...sem,
                        courseList: [...sem.courseList, null]
                    })
                }
                else
                    return sem;
            })
        });
    }
    const courseOptions: Course[] = availableCourses.filter((course) => !selectedCourses.some((selectedCourse) => selectedCourse?.code === course.code) && (semester.maxCredits - numCredits >= course.credits))
    return (
        <div className={classes.semesterScheduleCard}>
            <SemesterScheduleHeader credits={numCredits} semesterInfo={semester} />
            {selectedCourses.map( (selectedCourse, i) => <CourseSelectionSelect key={i} curCourse={selectedCourse} courseOptions={courseOptions} setSemesterCourseList={setSemesterCourseList} associatedSemester={semester} curPosition={i}/>)}
            {semester.maxCredits - numCredits >= 3 && (courseOptions.length > 0) && <NewCourseButton onClick={addCourseSlot} disabled={selectedCourses.includes(null)}/>}
        </div>
    )
}