'use client'
import styles from "./login.module.css"
import Image from "next/image"
import overlayBr from "../../assets/background-BR.jpg"
import Footer from "../../components/RegistrationFooter"
import Link from "next/link"
import { useState } from "react"
import { useLoading } from "../../components/ContextLoading";
import LoadingOverlay from "../../components/LoadingOverlay";



export default function Login() {
    const { loading, setLoading } = useLoading()
    const [emailTextToggle, setEmailTextToggle] = useState<boolean>(false)
    const [passwordTextToggle, setPasswordTextToggle] = useState<boolean>(false)
    const [loginValidate, setLoginValidate] = useState<boolean>(true)

    const [users, setUser] = useState({
        email: '',
        password: ''
    })
    function validateEmail(email: string) {
        setUser(prev => ({ ...prev, email }));
        return true;
    }

    function validatePassword(password: string) {
        setUser(prev => ({ ...prev, password }));
        return true;
    }
    function blurEmail(value: string) {
        if (validateEmail(value) === true && value != "") {
            setEmailTextToggle(true)
        } else if (value === "") {
            setEmailTextToggle(false)
        }
    }
    function blurPassword(value: string) {
        if (validatePassword(value) === true && value != "") {
            setPasswordTextToggle(true)
        } else if (value === "") {
            setPasswordTextToggle(false)
        }
    }
    function onClickPassword() {
        setPasswordTextToggle(true)
    }
    function onClickEmail() {
        setEmailTextToggle(true)
    }
    async function login(e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        setLoading(true)
        const API_URL =
        process.env.NODE_ENV === "production"
            ? "https://pedroflix-api.onrender.com"
            : "http://localhost:8080";
        try {
                const result = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        },
                    body: JSON.stringify(users)
                });
                if (!result.ok) {
                    console.error('Erro na requisição:', result.statusText);
                    setLoginValidate(false);
                    return;
                }else {
                        window.location.href = ('/login/dashboard');
                }
            } catch (err) {
                console.log("catch error" + err)
                setLoginValidate(false);
            } finally {
                setLoading(false)
            }
    }


    return (
        <div>
            <LoadingOverlay loading={loading} />
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
                <p className={loginValidate === false ? styles.toggleFalse : styles.toggleTrue}>Email ou senha incorreto, você pode redefinir sua senha ou tentar novamente.</p>
                <form className={styles.form} action="" onSubmit={async (e) => await login(e)} method="post">
                    <div className={styles.mainFormInput}>
                        <p className={emailTextToggle === false ? styles.formEmail : styles.formEmailToggle}>Email</p>
                        <input
                            className={styles.formInput}
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
                            className={styles.formInput}
                            onChange={e => validatePassword(e.target.value)}
                            onBlur={(e) => blurPassword(e.target.value)}
                            onClick={() => onClickPassword()}
                            type="password"
                            name="password"
                            id="password"/>
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
            <div className={styles.footer}>
                <Footer language="pt" languageStep="en1" />
            </div>
        </div>
    )
}