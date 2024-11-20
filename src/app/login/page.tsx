'use client'
import { useState } from "react";
import styles from "./login.module.css"
import Image from "next/image"
import overlayBr from "../../assets/background-BR.jpg"
import Footer from "../../components/RegistrationFooter"
import Link from "next/link"

export default function Login() {
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
                <form className={styles.form} action="submit">
                    <div className={styles.mainFormInput}>
                        <p className={styles.formEmail}>Email</p>
                        <input className={styles.formInput} type="email" name="email" id="email" />
                    </div>
                    <div className={styles.mainFormInput}>
                        <p className={styles.formPassword}>Senha</p>
                        <input className={styles.formInput} type="password" name="password" id="password" />
                    </div>
                    <button className={styles.formButton} type="submit">Entrar</button>
                    <Link className={styles.rememberPassword} href="/loginHelp">Esqueceu a senha?</Link>
                    <div className={styles.mainRemember}>
                        <div></div>
                        <input className={styles.rememberCheckbox} type="checkbox" name="remember" id="remember" />
                        <p className={styles.rememberText}>Lembre-se de mim</p>
                    </div>
                </form>
            </div>
            <div className={styles.preFooter}></div>
            <div className={styles.footer}>
                <Footer language="pt" languageStep="en1" />
            </div>
        </div>
    )
}