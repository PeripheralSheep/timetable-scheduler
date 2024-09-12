import { useStyles } from './styles/Header.classNames'
export default function Header({children}:{children: React.ReactNode}) {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <h2>{children}</h2>
        </header>
    )
}