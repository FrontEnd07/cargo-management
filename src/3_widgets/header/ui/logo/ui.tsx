import { LinkButton } from "6_shared/ui";
import Image from "next/image"
import styles from "./styles.module.scss";

export const Logo = () => (
    <LinkButton href='/dashboard'>
        <div className={`${styles.main} flex items-center justify-between`}>
            <Image
                alt="Почтаи нав"
                src="/logo.png"
                width={34}
                height={34}
                className="h-8 mr-4"
            />
            <span className={`${styles.logoText}`}>PochtaiNav</span>
        </div>
    </LinkButton>
)