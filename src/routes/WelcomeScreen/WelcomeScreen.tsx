import { useStyles } from './styles/WelcomeScreen.classNames'

import { useActionData, redirect } from 'react-router-dom';
import type { FormErrors } from './types/errors.types';
import GetStartedForm from './components/GetStartedForm';

export async function action( {request} : {request: Request}){
    const formData = await request.formData();

    if(formData.get("degree") === '' || formData.get("academicYear") === '')
    {
        const errors: FormErrors = {};
        if(formData.get("degree") === '')
            errors.degree= "Select a degree"
        if(formData.get("academicYear") === '')
            errors.academicYear =  "Select year you started degree"

        return errors;
    }
    else
        return redirect(`/${formData.get("degree")}/${formData.get("academicYear")}/plan-hub`)
}

export default function WelcomeScreen() {
    const errors: FormErrors = useActionData() as FormErrors;
    const classes = useStyles();

    return (
        <div className={classes.outerCard}>
            <GetStartedForm errors={errors}/>
        </ div>
    )
}