import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    outerCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        flex: '1 1 auto',
        gap: tokens.spacingVerticalM,
        width:'80%',
        margin:'auto',
        minWidth:'fit-content',
        height: '90%'
    },
    semesterScheduleContainer: {
        overflow: 'auto',
    },
    semesterScheduleCard: {
        border: '1px solid black',
        borderRadius: tokens.borderRadiusLarge,
        padding: '0 1rem 1rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
    },
    addNewSemesterButton: {
        margin: `${tokens.spacingVerticalS} 0px`
    },
    semesterScheduleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
    },
    semesterTitle: {
        display:'flex',
        flexWrap: 'wrap',
        gap: '5px',
        justifyContent:'center'
    },
    courseSelection: {
        display: 'flex',
        gap:tokens.spacingVerticalS,
        justifyContent:'center',
        '& select': {
            width:'50%',
            minWidth: '100px',
            textOverflow: 'ellipsis',
            whiteSpace:'nowrap',
            overflow: 'hidden',
            '& option': {
                width: '100%'
            }
        }
    },
    analyzeScheduleDiv: {
        marginTop: 'auto',
    }
})