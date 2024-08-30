import { useStyles } from './styles/Header.classNames'
export default function Header({heading}:{heading: string}) {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <h2>{heading}</h2>
        </header>
    )
}