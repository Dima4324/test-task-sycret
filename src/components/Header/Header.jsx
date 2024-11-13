import styles from "./Header.module.css"

export const Header = () => {
    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>GiftCertificate</h2>
            <nav>
                <ul className={styles.navList}>
                    <li>Сертификаты</li>
                    <li>О нас</li>
                    <li>Аккаунт</li>
                </ul>
            </nav>
        </header>
    )
}