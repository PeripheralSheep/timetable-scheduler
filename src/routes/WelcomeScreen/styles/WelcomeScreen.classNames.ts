import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    outerCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        flex: '1 1 auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap:tokens.spacingVerticalM,
        width: '70%',
        minWidth: 'fit-content',
        flex: '1 1 auto',
        padding: tokens.spacingVerticalXXXL
    },
    formField: {
        display:'flex',
        flexDirection: 'column',
        textAlign:'left'
    },
    submitButton: {
        alignSelf: 'center',
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForeground2,
        marginTop: 'auto'
    },
    formHeading: {
        marginTop: 'auto',
        lineHeight: tokens.lineHeightBase500
    }
})