import Head from "next/head"
import Image from "next/image"
import styles from "../../styles/home.module.scss"
import logoImg from "../../public/logo.png"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

export default function Home() {
  return (
    <>
      <Head>
          <title>Pizzapp - Faça seu login!</title>
      </Head>

      <div className={styles.containerCenter}>
          <Image src={logoImg} alt="Logo Pizzapp" />

          <div className={styles.login}>
              <form>
                < Input 
                  placeholder="Digite seu email"
                  type="email"
                />

                < Input 
                  placeholder="Digite sua senha"
                  type="password"
                />

                <Button 
                  type="submit"
                  loading={false}
                >
                  Acessar
                </Button>
              </form>
          </div>
      </div>
    </>
  )
}
