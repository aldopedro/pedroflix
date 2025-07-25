import styles from "../app/register/register.module.css"

interface Prop {
    language: string;
}

function RegistrationHeader (language:Prop) {

    if(language.language ==="pt") {
        return (
            <header className={styles.header}>
            <h1  className={styles.headerTitle}><link href="/">PEDROFLIX</link></h1>
            <button className={styles.headerButton}>Entrar</button>
        </header>
        )

    } else 
    return (
        <header className={styles.header}>
        <h1 className={styles.headerTitle}>PEDROFLIX</h1>
        <button className={styles.headerButton}>Sign In</button>
    </header>
    )

}
export default RegistrationHeader