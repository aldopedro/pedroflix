import styles from "../app/register/register.module.css"
interface Prop {
    language: string;
    languageStep: string;
}

function RegistrationFooter(language: Prop) {
    function portChange(languageStep: Prop) {
        if (languageStep.languageStep === "pt2") {
            return ("/Pedroflix-project/register-br/regform")
        } else if (languageStep.languageStep === "pt1") {
            return ("/Pedroflix-project/register-br")
        } else
            console.log()
    }
    function englishChange(language: Prop) {
        if (language.languageStep === "en2") {
            return ("/Pedroflix-project/register-en/regform")
        } else if (language.languageStep === "en1") {
            return ("/Pedroflix-project/register-en")
        } else
        console.log()
    }

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
