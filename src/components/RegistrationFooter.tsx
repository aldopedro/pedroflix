import styles from "../app/register/register.module.css"
import { useRouter } from "next/navigation"

interface Prop {
    language: string;
    languageStep: string;
}

function RegistrationFooter(language: Prop) {
    function portChange(languageStep: Prop) {
        if (languageStep.languageStep === "pt2") {
            router.push("/register/form")
        } else if (languageStep.languageStep === "pt1") {
            router.push('/register/br')
        }
    }
    function englishChange(language: Prop) {
        if (language.languageStep === "en2") {
            router.push('/register/formEN')
        } else if (language.languageStep === "en1") {
            router.push('/register/en')
        }
    }
    const router = useRouter()
    if (language.language === "pt") {
        return (
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerTitle}>Dúvidas? Ligue 0800 591 2876</p>
                    <ul className={styles.footerLink}>
                        <li className={styles.footerLinkItem}>Perguntas frequentes</li>
                        <li className={styles.footerLinkItem}>Central de Ajuda</li>
                        <li className={styles.footerLinkItem}>Pedroflix Shop</li>
                        <li className={styles.footerLinkItem}>Termos de Uso</li>
                        <li className={styles.footerLinkItem}>Privacidade</li>
                        <li className={styles.footerLinkItem}>Preferências de cookies</li>
                        <li className={styles.footerLinkItem}>Informações corporativas</li>
                    </ul>
                    <div className={`nf nf-fa-globe ${styles.footerMainSelect}`}>
                        <select onChange={(e) => e.target.value === "pt-BR" ? portChange(language) : englishChange(language)} name="LanguageSelect" className={styles.footerSelect}>
                            <option lang="pt" label='Português' value="pt-BR" className={styles.footerOption}>Português</option>
                            <option lang="en" label='English' value="en-BR" className={styles.footerOption}>English</option>
                        </select>
                    </div>
                </div>
            </footer>
        )
    } else if(language.language === "en")
        return (
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerTitle}>Questions? Call 0800 591 2876</p>
                    <ul className={styles.footerLink}>
                        <li className={styles.footerLinkItem}>FAQ</li>
                        <li className={styles.footerLinkItem}>Help Center</li>
                        <li className={styles.footerLinkItem}>Pedroflix Shop</li>
                        <li className={styles.footerLinkItem}>Terms of Use</li>
                        <li className={styles.footerLinkItem}>Privacy</li>
                        <li className={styles.footerLinkItem}>Cookie Preferences</li>
                        <li className={styles.footerLinkItem}>Corporate Information</li>
                    </ul>
                    <div className={`nf nf-fa-globe ${styles.footerMainSelect}`}>
                        <select onChange={(e) => e.target.value === "pt-BR" ? portChange(language) : englishChange(language)} name="LanguageSelect" className={styles.footerSelect}>
                            <option lang="en" label='English' value="en-BR" className={styles.footerOption}>English</option>
                            <option lang="pt" label='Português' value="pt-BR" className={styles.footerOption}>Português</option>
                        </select>
                    </div>
                </div>
            </footer>
        )
}


export default RegistrationFooter
