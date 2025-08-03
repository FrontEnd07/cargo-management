import { Metadata } from "next"
import { RegisterForm } from "4_features/auth"

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Пройти регистрацию для работы с системой."
}

export default function Home() {
    return <RegisterForm />
}