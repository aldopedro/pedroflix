'use client'
import styles from "./login.module.css"
import Image from "next/image"
import overlayBr from "../../assets/background-BR.jpg"
import Footer from "../../components/RegistrationFooter"
import Link from "next/link"
import { useState } from "react"




export default function Login() {
    const [emailBorderToggle, setEmailBorderToggle] = useState<boolean>()
    //const [emailTextToggle, setEmailTextToggle] = useState<boolean>()
    const [emailValue, setEmailValue] = useState<string>()
    const [activeValidationRed, setActiveValidationRed] = useState<boolean>()

    function validateEmail(email: string) {
        const validate = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        if (!validate.test(email)) {
            setEmailValue(email);
            setEmailBorderToggle(false);
            return false;
        } else {
            setEmailBorderToggle(true);
            setEmailValue(email);
            return true;
        }
    }
    return (
        <div>
            <div className={styles.overlay}>
                <div className={styles.overlayShadow}></div>
                <Image className={styles.overlayImage}
                    src={overlayBr}
                    alt=""
                />
            </div>
            <div className={styles.header}>
                <Link className={styles.headerTitle} href="/">PEDROFLIX</Link>
                <div></div>
            </div>
            <div className={styles.loginForm}>
                <h4 className={styles.formTitle}>Entrar</h4>
                <form className={styles.form}>
                    <div className={styles.mainFormInput}>
                        <p className={styles.formEmail}>Email</p>
                        <input
                            className={`${emailBorderToggle === true ? styles.formInputGreen : emailBorderToggle === false && emailValue != "" && activeValidationRed === true ? styles.formInputRed : styles.formInput}`}
                            onChange={e => validateEmail(e.target.value)}
                            onBlur={(e) => validateEmail(e.target.value) === true && e.target.value != "" ? setEmailBorderToggle(true) : validateEmail(e.target.value) === false ? setActiveValidationRed(true) : setEmailBorderToggle(false)}
                            
                            type="email"
                            name="email"
                            id="email" />
                    </div>
                    <div className={styles.mainFormInput}>
                        <p className={styles.formPassword}>Senha</p>
                        <input 
                        className={styles.formInput}
                            type="password"
                            name="password"
                            id="password" />
                    </div>
                    <button className={styles.formButton}>Entrar</button>
                    <Link className={styles.rememberPassword} href="/loginHelp">Esqueceu a senha?</Link>
                    <div className={styles.mainRemember}>
                        <div></div>
                        <label htmlFor="remember"></label>
                        <input className={styles.rememberCheckbox} type="checkbox" name="remember" id="remember" />
                        <p className={styles.rememberText}>Lembre-se de mim</p>
                    </div>
                    <p className={styles.backToHome}>Novo por aqui? <Link className={styles.backToHomeLink} href="/"> Assine agora</Link>.</p>
                </form>
            </div>
            <div className={styles.preFooter}></div>
            <div className={styles.footer}>
                <Footer language="pt" languageStep="en1" />
            </div>
        </div>
    )
}