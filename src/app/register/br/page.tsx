'use client'
import styles from "../register.module.css"
import RegistrationFooter from "../../../components/RegistrationFooter"
import RegistrationHeader from "../../../components/RegistrationHeader"
import { useRouter } from "next/navigation"

function RegisterBr() {
    function nextStep () {
        router.push("/register/form")
    }
    const router = useRouter()
    return (
        <div className={styles.master}>
            <RegistrationHeader language="pt"/>
            <section className={styles.registerAccount}>
                <div className={styles.devices}></div>
                <p className={styles.step}>PASSO <strong>1</strong> DE <strong>3</strong></p>
                <h4 className={styles.stepTitle}>Termine de configurar sua conta</h4>
                <h6 className={styles.stepDescription}>A Pedroflix é personalizada para você. Crie uma senha para começar a assistir à Pedroflix.</h6>
                <button className={styles.stepButton} onClick={nextStep} >Próximo</button>
            </section>
            <RegistrationFooter language="pt" languageStep="en1"/>
        </div>
    )
} 
export default RegisterBr