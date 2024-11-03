import style from "../pages/Registration/register.module.css"

interface Prop {
    language: string;
}

function RegistrationHeader (language:Prop) {

    if(language.language ==="pt") {
        return (
            <header className={style.header}>
            <h1  className={style.headerTitle}>PEDROFLIX</h1>
            <button className={style.headerButton}>Entrar</button>
        </header>
        )

    } else 
    return (
        <header className={style.header}>
        <h1 className={style.headerTitle}>PEDROFLIX</h1>
        <button className={style.headerButton}>Sign In</button>
    </header>
    )

}
export default RegistrationHeader