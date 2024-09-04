import type { ButtonHTMLAttributes } from "react"
export default function Button({contextClass, children, HTMLButtonAttributes}:{contextClass?: string, children: React.ReactNode, HTMLButtonAttributes?: ButtonHTMLAttributes<HTMLButtonElement>}) {
    return (
        <button className={contextClass} {...HTMLButtonAttributes}>{children}</button>
    )
}