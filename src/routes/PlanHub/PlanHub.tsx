import { useState, type Dispatch, type SetStateAction } from "react";
import { Outlet, useOutletContext, useLoaderData } from "react-router-dom";
import type { CourseCode } from "../../types/course.types.ts";
import type { CourseSemester, CoursesJSON } from "../../types/course.types.ts";

import Header from "../../common/Header/Header";
import CoursePlan from "./sub-routes/CoursePlan/CoursePlan.tsx";
import CompletedCourses from "./sub-routes/CompletedCourses/CompletedCourses.tsx";
import PlanHubIndex from "./sub-routes/PlanHubIndex/PlanHubIndex.tsx";

type CompletedCoursesContextType = {
  completedCourses: CourseCode[],
  setCompletedCourses: Dispatch<SetStateAction<CourseCode[]>>
}

type SemestersInfoContextType = {
  semestersInfo: CourseSemester[],
  setSemestersInfo: Dispatch<SetStateAction<CourseSemester[]>>
}

type CoursesObjectType = {
  courses: CoursesJSON
}

interface DegreeParams {
    degree: string,
    academicYear: string
}

interface HeaderParams {
  degreeName: string,
  academicYear: string
}

export function useCompletedCourses() {
  return useOutletContext<CompletedCoursesContextType>();
}

export function useSemestersInfo() {
  return useOutletContext<SemestersInfoContextType>();
}

export function useCourses() {
  return useOutletContext<CoursesObjectType>();
}

export const subRoutes = [
    {
      path: "completed-courses",
      element:  <CompletedCourses />
    },
    {
      path: "make-plan",
      element: <CoursePlan />
    },
    {
      index: true,
      element: <PlanHubIndex />
    }
]

export async function loader( {params} : {params: DegreeParams} ) {
  const degreesDataResponse = await fetch("/src/data/degreeInfo.json");
  const coursesDataResponse = await fetch("/src/data/courseInfo.json");
  return Promise.all([degreesDataResponse.json(), coursesDataResponse.json()]).then((data)=> {
    return {
      degreeData: {
        degreeName: data[0][params.degree]["name"],
        academicYear: params.academicYear
      },
      courses: data[1]
    }
  })
}

export default function PlanHub() {
  const [completedCourses, setCompletedCourses] = useState<Array<CourseCode>>([])
  const [semestersInfo, setSemestersInfo] = useState<CourseSemester[]>([
    {
        year: 2024,
        maxCredits: 18,
        semesterNumber: 1,
        courseList: []
    },
    {
        year: 2025,
        maxCredits: 18,
        semesterNumber: 1,
        courseList: []
    }
  ]);
 
  const {degreeData, courses} = useLoaderData() as { degreeData: HeaderParams, courses: CoursesJSON};
  const heading = `${degreeData.degreeName} ${degreeData.academicYear}`

  return (
    <>
        <Header>{heading}</ Header>
        <Outlet context={ {
          courses,
          completedCourses, setCompletedCourses, 
          semestersInfo, setSemestersInfo} satisfies CoursesObjectType | CompletedCoursesContextType | SemestersInfoContextType}/>
    </>
  )
}