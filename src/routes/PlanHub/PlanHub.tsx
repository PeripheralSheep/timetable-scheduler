import Header from "../../common/Header/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import CoursePlan from "./sub-routes/CoursePlan/CoursePlan.tsx";
import CompletedCourses from "./sub-routes/CompletedCourses/CompletedCourses.tsx";

interface DegreeParams {
    degree: string,
    academicYear: string
}

interface HeaderParams {
  degreeName: string,
  academicYear: string
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
      element: <h1>Placeholder</h1>
    }
]

export async function loader( {params} : {params: DegreeParams} ) {
  const degreesDataResponse = await fetch("/src/data/degreeInfo.json");
  return degreesDataResponse.json().then((data)=> {
    return {
      degreeName: data[params.degree]["name"],
      academicYear: params.academicYear
    }
  })
}

export default function PlanHub() {
    const degreeData = useLoaderData() as HeaderParams;
    const heading = `${degreeData.degreeName} ${degreeData.academicYear}`
    return (
        <>
            <Header>{heading}</ Header>
            <Outlet />
        </>
    )
}