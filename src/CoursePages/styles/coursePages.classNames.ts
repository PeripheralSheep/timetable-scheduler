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
        minWidth:'fit-content'
    },
    instructionLine: {
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        width:'100%'
    },
    filterOptions: {
        display: 'grid',
        gridTemplateAreas: `
        "Area Level"
        "Code Faculty"
        `,
    },
    checkField: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        width:'100%',
        gap: tokens.spacingHorizontalS,
        minWidth: 'min(320px,100%)'
    },
    checkboxOption: {
        border: '1px solid black',
        borderRadius: tokens.borderRadiusLarge,
        textAlign: 'left',
        display:'flex',
        height: '50px',
    },
    checkboxLabel: {
        flex:'1 1 auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        lineHeight:'50px',
        userSelect: 'none'
    },  
})