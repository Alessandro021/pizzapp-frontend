import { useContext, FormEvent, useState} from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"
import logoImg from "../../public/logo.png"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { toast } from "react-toastify"

import Link from "next/link"

import { AuthContext } from "../contexts/AuthContext"

export default function Home() {
  const {signIn } = useContext(AuthContext)

  const [ email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [ loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
      event.preventDefault()

      if(email === "" || password === "" ){

        toast.error("Prencha os campos corretamente!")
        return;
      }

      setLoading(true)

      let data = {
        email,
        password
      }

      await signIn(data)

      setLoading(false)
  }

  return (
    <>
      <Head>
          <title>Pizzapp - Faça seu login!</title>
      </Head>

      <div className={styles.containercenter}>
          <Image className={styles.image} src={logoImg} alt="Logo Pizzapp" />

          <div className={styles.login}>
              <form onSubmit={ handleLogin}>
                < Input 
                  placeholder="Digite seu email"
                  type="email"
                  value={email}
                  onChange={ event => setEmail(event.target.value)}
                />

                < Input 
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={ event => setPassword(event.target.value)}
                />

                <Button 
                  type="submit"
                  loading={loading}
                >
                  Acessar
                </Button>
              </form>
                <Link legacyBehavior href="/signup">
                    <a className={styles.text}>Não pussui uma conta? Cadastre-se!</a>
                </Link>
          </div>
      </div>
    </>
  )
}
