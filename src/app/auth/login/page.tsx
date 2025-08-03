import { LoginForm } from "4_features/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Авторизоваться",
    description: "Пожалуйста, войдите в систему, используя свою учетную запись."
}

export default function Home() {
    return <LoginForm />
}