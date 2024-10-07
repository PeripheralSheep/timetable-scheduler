import { useState, type Dispatch, type SetStateAction } from "react";
import { Outlet, useOutletContext, useLoaderData } from "react-router-dom";
import type { OverallDegreeRequirements } from "../../types/degree.types.ts";
import type { CourseSemester, CoursesJSON, CourseCode } from "../../types/course.types.ts";

import Header from "../../common/Header/Header";
import CoursePlan from "./sub-routes/CoursePlan/CoursePlan.tsx";
import CompletedCourses from "./sub-routes/CompletedCourses/CompletedCourses.tsx";
import PlanHubIndex from "./sub-routes/PlanHubIndex/PlanHubIndex.tsx";

type CompletedCoursesContextType = {
  completedCourses: Set<CourseCode>
  setCompletedCourses: Dispatch<SetStateAction<Set<CourseCode>>>
}

type SemestersInfoContextType = {
  semestersInfo: CourseSemester[],
  setSemestersInfo: Dispatch<SetStateAction<CourseSemester[]>>
}

type DegreeDataContextType = {
  degreeRequirements: OverallDegreeRequirements
}

type CoursesObjectType = {
  courses: CoursesJSON
}

interface DegreeParams {
    degree: string,
    academicYear: string,
}

interface DegreeLoaderReturn {
  degreeName: string,
  academicYear: string,
  degreeRequirements: OverallDegreeRequirements
}

export function useCompletedCourses() {
  return useOutletContext<CompletedCoursesContextType>();
}

export function useSemestersInfo() {
  return useOutletContext<SemestersInfoContextType>();
}

export function useAvailableCourses() {
  return useOutletContext<CoursesObjectType>();
}

export function useDegreeRequirements() {
  return useOutletContext<DegreeDataContextType>();
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
        academicYear: params.academicYear,
        degreeRequirements: data[0][params.degree][params.academicYear]
      },
      courses: data[1]
    }
  })
}

export default function PlanHub() {
  const [completedCourses, setCompletedCourses] = useState<Set<CourseCode>>(new Set())
  const [semestersInfo, setSemestersInfo] = useState<CourseSemester[]>([]);
 
  const {degreeData, courses} = useLoaderData() as { degreeData: DegreeLoaderReturn, courses: CoursesJSON};
  const heading = `${degreeData.degreeName} ${degreeData.academicYear}-${parseInt(degreeData.academicYear)+1}`
  const degreeRequirements = degreeData.degreeRequirements
  console.log(degreeRequirements);
  return (
    <>
        <Header>{heading}</ Header>
        <Outlet context={ {
          courses,
          degreeRequirements,
          completedCourses, setCompletedCourses, 
          semestersInfo, setSemestersInfo} satisfies CoursesObjectType | DegreeDataContextType | CompletedCoursesContextType | SemestersInfoContextType}/>
    </>
  )
}