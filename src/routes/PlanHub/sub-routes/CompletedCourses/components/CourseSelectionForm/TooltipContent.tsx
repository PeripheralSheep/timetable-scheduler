import type { ComplexPrequisitesType, Course} from "../../../../../../types/course.types"
import type { CourseCode } from "../../../../../../types/course.types";

function formatPrerequisites(prerequisites: ComplexPrequisitesType) {
    let formattedString = ""

    function formatPrerequisitesHelper(key: "or" | "and", arr: Array<ComplexPrequisitesType>) {
        const joiningWord = key.toUpperCase();
        formattedString += "("
        
        for(let i = 0; i < arr.length; i++) {
            if(typeof arr[i] === 'string'){
                formattedString += arr[i];
            }
            else{
                const [nextKey, value] = Object.entries(arr[i])[0]
                formatPrerequisitesHelper(nextKey as "or" | "and", value)
            }
            if(i < arr.length - 1)formattedString += ` ${joiningWord} `
        }
        formattedString += ")"
    }

    if(isSimplePrerequisite(prerequisites))
        return prerequisites;
    else {
        for(let [key, value] of Object.entries(prerequisites)) {
            formatPrerequisitesHelper(key as "or" | "and", value)
        }
    }
    return formattedString;
}

function isSimplePrerequisite(prerequisites: ComplexPrequisitesType): prerequisites is CourseCode {
    return (prerequisites as CourseCode).length !== undefined;
}

export default function TooltipContent(props: Course) {
    const {code, name, credits, prerequisites, corequisites, antirequisites} = props;
    
    return (
        <div>
            <div>Course Code: {code}</div>
            <div>Name: {name}</div>
            <div>Credits: {credits}</div>
            <div>Prerequisites: {prerequisites ? formatPrerequisites(prerequisites) : 'none'}</div>
            <div>Corequisites: {corequisites || 'none'}</div>
            <div>Antirequisites: {antirequisites || 'none'}</div>
        </div>
    )
}