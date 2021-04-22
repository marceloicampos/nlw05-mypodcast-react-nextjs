import { Header } from '../components/Header'

import { Player } from '../components/Player'

import '../styles/global.scss'

import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp

// o arquivo _app.tsx é um arquivo que fica em volta de toda a aplicação, o sistema de rotas do Next JS é indexado a partir da pastas pages e o index é o arquivo principal e o _app é um arquivo global que fica em volta de toda a aplicação então sempre que chamamos qualquer rota ele roda o _app para verificar as configurações a serem aplicadas.

// então para não provocarmos uma repetição de configurações a cada pedido de rota usamos um arquivo _document e assim podemos configurar o formato do html que ficará por volta da nossa aplicação e só será chamado um única vez.
