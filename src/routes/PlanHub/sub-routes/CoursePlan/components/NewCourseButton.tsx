import type { ButtonHTMLAttributes } from "react";
import Button from "./Button";
export default function NewCourseButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return(
        <Button HTMLButtonAttributes={props}>+ Add New Course</Button>
    )
}