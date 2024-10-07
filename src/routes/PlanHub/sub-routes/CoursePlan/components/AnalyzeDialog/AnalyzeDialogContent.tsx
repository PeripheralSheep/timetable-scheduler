import { DialogContent } from "@fluentui/react-components"
import { useStyles } from "../../styles/analyzeDialog.classNames";
import type { SemesterErrors, GeneralErrors } from "./AnalyzeDialog";
export default function AnalyzeDialogContent({semesterErrors, generalErrors} : {
    generalErrors?: GeneralErrors[],
    semesterErrors?: SemesterErrors[]
}) {
    const classes = useStyles()

    if((semesterErrors && semesterErrors.length > 0 )|| (generalErrors && generalErrors.length > 0))
        return (
            <DialogContent>
                <div className={classes.passFailCards}>
                    <h2>Failed</h2>
                    <ul className={classes.failList}>
                        {generalErrors?.map((generalError) => {
                            
                            return (
                                <>
                                    {generalError};
                                </>
                            )
                        })}
                    </ul>
                    
                    {semesterErrors?.map((semesterError) => {
                        return (
                            <>
                                <h3>Semester {semesterError.semesterKey}</h3>
                                <ul className={classes.failList}>
                                    {semesterError.errorsInSemester.map((errorInSemester) => {
                                        return (
                                            <li key={errorInSemester.area}>
                                                <h4>{errorInSemester.area} Errors</h4>
                                                <ul>
                                                    {errorInSemester.errors}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        )
                    })}
                </div>
            </DialogContent>
        )
    else 
        return (
            <DialogContent>
                <img src="/src/assets/smiling-face.png" />
                <h2>All Good To Go!</h2>
            </DialogContent>
        )
}