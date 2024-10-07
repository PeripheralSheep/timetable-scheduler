import { useStyles } from './styles/WelcomeScreen.classNames'

import { useActionData, redirect, useLoaderData, defer, Await } from 'react-router-dom';
import type { FormErrors } from './types/errors.types';
import GetStartedForm from './components/GetStartedForm';
import { Suspense } from 'react';
import type { DegreesData } from '../../types/degree.types';

export async function action( {request} : {request: Request}){
    const formData = await request.formData();

    if(formData.get("degreeKey") === '' || formData.get("academicYear") === '')
    {
        const errors: FormErrors = {};
        if(formData.get("degreeKey") === '')
            errors.degree= "Select a degree"
        if(formData.get("academicYear") === '')
            errors.academicYear =  "Select year you started degree"

        return errors;
    }
    else
        return redirect(`/${formData.get("degreeKey")}/${formData.get("academicYear")}/plan-hub`)
}

export async function loader(){
    const degreesData = await fetch("/src/data/degreeInfo.json");
    return defer({degreesData: degreesData.json()})
}


export default function WelcomeScreen() {
    const errors: FormErrors = useActionData() as FormErrors;
    const classes = useStyles();
    const { degreesData } = useLoaderData() as {degreesData: DegreesData};

    return (
        <div className={classes.outerCard}>
            <Suspense fallback={<div>Loading...</div>}>
                <Await
                    resolve={degreesData}
                    errorElement={<div>Error!</div>}
                >
                    {(resolvedDegreeData) => <GetStartedForm errors={errors} degreesData={resolvedDegreeData}/>}
                </Await>
            </Suspense>
            
        </ div>
    )
}