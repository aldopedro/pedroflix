'use client'
import styles from "./login.module.css"
import Image from "next/image"
import overlayBr from "../../assets/background-BR.jpg"
import Footer from "../../components/RegistrationFooter"
import Link from "next/link"
import { useState } from "react"




export default function Login() {
    const [emailBorderToggle, setEmailBorderToggle] = useState<boolean>()
    const [emailTextToggle, setEmailTextToggle] = useState<boolean>(false)
    const [emailValue, setEmailValue] = useState<string>()
    const [activeValidationRed, setActiveValidationRed] = useState<boolean>()
    const [passwordBorderToggle, setPasswordBorderToggle] = useState<boolean>(true)
    const [passwordTextToggle, setPasswordTextToggle] = useState<boolean>(false)
    const [passwordValue, setPasswordValue] = useState<string>()
    const [users, setUser] = useState({
        email: '',
        password: ''
      })
    function validateEmail(email: string) {
        const validate = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        if (!validate.test(email)) {
            setEmailValue(email);
            setEmailBorderToggle(false);
            return false;
        } else {
            setEmailBorderToggle(true);
            setEmailValue(email);
            setUser({...users, email: `${emailValue}`});
            return true;
        }
    }
    function validatePassword(pass: string) {
        const validate = new RegExp (/^[0-9a-zA-Z$*&@#]{4,}$/)
        if (!validate.test(pass)) {
            setPasswordValue(pass);
            setPasswordBorderToggle(false);
            return false;
        } else {
            setPasswordBorderToggle(true);
            setPasswordValue(pass);
            setUser({...users, password: `${passwordValue}`});
            return true;
        }
    }
    function blurEmail (value: string) {
        if (validateEmail(value) === true && value != "") {
            setEmailTextToggle(true)
        }else if (value === "") {
            setEmailTextToggle(false)    
        } else if (validateEmail(value) === false) {
            setEmailBorderToggle(false)
        }
        setActiveValidationRed(true)
    }
    function blurPassword (value: string) {
        if (validatePassword(value) === true && value != "") {
            setPasswordTextToggle(true)
        }else if (value === "") {
            setPasswordTextToggle(false)    
        } else if (validatePassword(value) === false) {
            setPasswordBorderToggle(false)
        }
        setActiveValidationRed(true)
    }
    function onClickPassword () {
        setPasswordTextToggle(true)
        setPasswordBorderToggle(true)
        setActiveValidationRed(false)
    }
    function onClickEmail () {
        setEmailTextToggle(true)
        setEmailBorderToggle(true)
        setActiveValidationRed(false)
    }
    async function login (e:React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const result = await fetch ('http://localhost:8081/login', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json", "Acess-Control-Allow-Origin": "*", },
            body: JSON.stringify(users)
        }).then()
        console.log(await result.json())
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
                <form className={styles.form} action="" onSubmit={async (e) => await login(e)} method="post">
                    <div className={styles.mainFormInput}>
                        <p className={emailTextToggle === false ? styles.formEmail : styles.formEmailToggle}>Email</p>
                        <input
                            className={emailBorderToggle === false && emailValue != "" && activeValidationRed === true ? styles.formInputRed : styles.formInput}
                            onChange={e => validateEmail(e.target.value)}
                            onBlur={(e) => blurEmail(e.target.value)}
                            onClick={() => onClickEmail()}
                            type="email"
                            name="email"
                            id="email" />
                    </div>
                    <div className={styles.mainFormInput}>
                        <p className={passwordTextToggle === false ? styles.formPassword : styles.formPasswordToggle}>Senha</p>
                        <input
                            className={passwordBorderToggle === false && passwordValue != "" && activeValidationRed === true ? styles.formInputRed : styles.formInput}
                            onChange={e => validatePassword(e.target.value)}
                            onBlur={(e) => blurPassword(e.target.value)}
                            onClick={() => onClickPassword()}
                            type="password"
                            name="password"
                            id="password" />
                            <p className={passwordBorderToggle === false && activeValidationRed === true ? styles.formPasswordInfoFalse : styles.formPasswordInfo} >A senha deve ter entre 4 e 60 caracteres</p>
                    </div>
                    <button className={styles.formButton} type="submit" onClick={login}>Entrar</button>
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