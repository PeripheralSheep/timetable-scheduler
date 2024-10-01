

type SuccesfulReturnType = {
    satisfied: true,
}

type UnsuccessfulReturnType = {
    satisfied: false,
    errorMessagesJSX: JSX.Element;
}

export type CheckReturnType = SuccesfulReturnType | UnsuccessfulReturnType

export type ErrorCourseCodeType = {
    description: string,
    errorCourseCodes: (string | JSX.Element)[];
}