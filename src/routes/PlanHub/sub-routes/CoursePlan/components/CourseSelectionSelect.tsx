import type { Course, CourseSemester } from "../../../../../types/course.types.ts"
import type { DispatcherType } from "../../../types/StateProps.types";

import { useStyles } from "../styles/coursePlan.classNames";
export default function CourseSelectionSelect({curCourse, courseOptions, setSemesterCourseList, curPosition, associatedSemester}: {
    curCourse: Course | null, 
    courseOptions : Course[], 
    setSemesterCourseList: DispatcherType<CourseSemester[]>, 
    curPosition: number, associatedSemester: CourseSemester
}) {
    const classes = useStyles();

    const removeChoice = () => {
        setSemesterCourseList((semesters) => {
            return semesters.map( (curSemester) => {
                if(curSemester.semesterNumber === associatedSemester.semesterNumber && curSemester.year === associatedSemester.year){
                    return ({
                        ...curSemester,
                        courseList: curSemester.courseList.filter( (curCourse,index) => index !== curPosition)
                    })
                }
                else {
                    return curSemester
                }
            });
        })
    };

    const changeCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCourse = courseOptions.find((course) => course.code === e.target.value);

        setSemesterCourseList((semesters) => {
            return semesters.map( (curSemester) => {
                if(curSemester.semesterNumber === associatedSemester.semesterNumber && curSemester.year === associatedSemester.year){
                    return ({
                        ...curSemester,
                        courseList: curSemester.courseList.map((curCourse,index) => curPosition === index ? newCourse ?? null : curCourse)
                    })
                }
                else {
                    return curSemester
                }
            });
        });
    }

    return (
        <div className={classes.courseSelection}>
            <select value={curCourse?.code} onChange={changeCourse} name="courseChoice" id="courseChoice">
                <option 
                    value={curCourse?.code}
                >
                    {curCourse ? `${curCourse.code} - ${curCourse.name}` : 'Choose a Course'}
                </option>
                {courseOptions.map( (courseOption) => (
                    <option 
                        key={courseOption.code} 
                        value={courseOption.code}
                    >
                        {courseOption.code} - {courseOption.name}
                    </option>
                ))}
            </select>
            <button onClick={removeChoice}>x</button>
        </div>
    )
}