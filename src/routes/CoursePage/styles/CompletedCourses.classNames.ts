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
        height:'90%'
    },
    filterButton: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS
    },
    filterOptions: {
        display: 'grid',
        gridTemplateAreas: `
        "Area Level"
        "Code Faculty"
        `,
        '@media (min-width: 480px)': {
            alignSelf: 'flex-end'
        },
        gap: tokens.spacingHorizontalS,
    },
    filterField: {
        display: 'flex',
        flexWrap:'wrap',
        gap:tokens.spacingHorizontalS
    },
    levelCheckboxes: {
        display:'flex',
        gap: tokens.spacingHorizontalS,
        alignItems: 'center'
    },
    levelCheckbox: {
        '& input[type="checkbox"]': {
            appearance:'none',
            margin: 0,
            ':checked + label': {
                backgroundColor: tokens.colorBrandBackgroundSelected,
                color: tokens.colorNeutralForeground2
            },
            ':not(:checked) + label': {
                backgroundColor: tokens.colorNeutralBackground1
            }
        },
        '& label': {
            border: '1px solid black',
            borderRadius: tokens.borderRadiusCircular,
            userSelect: 'none',
            height: '25px',
            width: '25px',
            display:'inline-block',
            lineHeight:'25px'
        },
    },
    form: {
        width:'100%',
        height:'80%',
        display: 'flex',
        flexDirection: 'column',
        padding: 'tokens.spacingHorizontalS 0',
        gap: tokens.spacingVerticalL
    },
    checkField: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        overflowY: 'auto',
        maxHeight:'100%',
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
    submitButton: {
        alignSelf:'center',
        marginTop:'auto',
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForeground2
    }
})