import type { Course } from "../../types/Degree.types"
export default function TooltipContent(props: Course) {
    return (
        <div>
            <div>Course Code: {props.code}</div>
            <div>Name: {props.name}</div>
            <div>Credits: {props.credits}</div>
            <div>Prerequisites: {props.prerequisites || 'none'}</div>
            <div>Corequisites: {props.corequisites || 'none'}</div>
            <div>Antirequisites: {props.antirequisites || 'none'}</div>
        </div>
    )
}