import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useStyles } from '../styles/WelcomeScreen.classNames';
import type { FormErrors } from '../types/errors.types';
import DegreeField from './DegreeField';
import AcademicYearField from './AcademicYearField';
import type { DegreesData } from '../../../types/degree.types';

export default function GetStartedForm( {errors, degreesData}:{
    errors?: FormErrors, 
    degreesData: DegreesData
}) {
    const classes = useStyles();
    const [degreeKey, setDegreeKey] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    return ( 
        <Form method="POST" className={classes.form}>
            <h1 className={classes.formHeading}>Welcome to UWI Schedule Planner</h1>
            <DegreeField degreesData={degreesData} setDegree={setDegreeKey} degreeError={errors?.degree}/>
            <AcademicYearField degreesData={degreesData} chosenDegree={degreeKey} setAcademicYear={setAcademicYear} academicYearError={errors?.academicYear}/>
            <input type="text" name="degreeKey" value={degreeKey} readOnly hidden/>
            <input type="text" name="academicYear" value={academicYear} readOnly hidden/>
            <button type="submit" className={classes.submitButton}>Get Started</button>
        </Form>
    )
}