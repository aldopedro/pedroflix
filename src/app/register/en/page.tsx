'use client'
import style from '../register.module.css'
import RegistrationFooter from "../../../components/RegistrationFooter"
import RegistrationHeader from "../../../components/RegistrationHeader"
import { useRouter } from "next/navigation"

function RegisterEn() {
    function nextStep () {
        router.push("/register/formEN")
    }
    const router = useRouter()
    return (
        <div className={style.master}>
            <RegistrationHeader language="en"/>
            <section className={style.registerAccount}>
                <div className={style.devices}></div>
                <p className={style.step}>PASSO <strong>1</strong> DE <strong>3</strong></p>
                <h4 className={style.stepTitle}>Finish setting up your account</h4>
                <h6 className={style.stepDescription}>Netflix is personalized for you. Create a password to start watching <br/>Pedroflix.</h6>
                <button className={style.stepButton} onClick={nextStep} >Next</button>
            </section>
            <RegistrationFooter language="en" languageStep="registerBR"/>
        </div>
    )
} 
export default RegisterEn