import Header from "../../common/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import CoursePlan from "./sub-routes/CoursePlan/CoursePlan.tsx";
import CompletedCourses from "./sub-routes/CompletedCourses/CompletedCourses.tsx";

interface DegreeParams {
    degree: "string",
    academicYear: "string"
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
// export function loader( {params} : {params: DegreeParams} ) {
//     return params;
// }

export default function PlanHub() {
    const degreeData = useParams();
    const heading = `${degreeData.degree} ${degreeData.academicYear}`
    return (
        <>
            <Header heading={heading}/>
            <Outlet />
        </>
    )
}