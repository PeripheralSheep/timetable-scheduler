import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    outerCard: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 auto',
        width:'80%',
        margin:'auto',
        minWidth:'fit-content',
        height: '90%',
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    passFailCards: {
        flex: '1 1 50%',
        minWidth: '360px',
        '& h2': {
            textAlign:'center'
        },
        textAlign: 'left',
    },
    passList: {
        '& > li':{
            listStyleImage: 'url("../../../public/checkmark.svg")'
        }
    },
    failList: {
        '& > li':{
            listStyleImage: 'url("../../../public/cross.svg")',
            '& ul li': {
                listStyleImage: 'none',
                listStyleType: "-"
            }
        }
    }
})