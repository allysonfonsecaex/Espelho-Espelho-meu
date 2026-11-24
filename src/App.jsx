import { useState } from 'react'
import {
  FiBookmark,
  FiCompass,
  FiHeart,
  FiHome,
  FiMessageCircle,
  FiPlusSquare,
  FiSearch,
  FiUser,
} from 'react-icons/fi'
import Header from './components/Header'
import Post from './components/Post'
import posts from './data/posts.json'
import './App.css'

const stories = [
  { user: 'luna.naestrada', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80' },
  { user: 'caio.nomundo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
  { user: 'mari.debordo', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80' },
  { user: 'theo.pelomundo', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80' },
  { user: 'bia.sempressa', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80' },
  { user: 'joao.depassagem', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
]

const suggestions = [
  { user: 'luna.naestrada', name: 'Luna Oliveira · mochileira', avatar: stories[0].avatar },
  { user: 'caio.nomundo', name: 'Caio Nascimento · trilhas', avatar: stories[1].avatar },
  { user: 'mari.debordo', name: 'Mariana Dias · pelo litoral', avatar: stories[2].avatar },
]

const navigation = [
  { label: 'Início', icon: FiHome, active: true },
  { label: 'Explorar', icon: FiCompass },
  { label: 'Mensagens', icon: FiMessageCircle },
  { label: 'Salvos', icon: FiBookmark },
  { label: 'Criar', icon: FiPlusSquare },
  { label: 'Perfil', icon: FiUser },
]

function App() {
  const [search, setSearch] = useState('')
  const filteredPosts = posts.filter((post) =>
    `${post.user} ${post.name} ${post.location} ${post.caption}`
      .toLocaleLowerCase('pt-BR')
      .includes(search.toLocaleLowerCase('pt-BR')),
  )

  return (
    <div className="app">
      <Header search={search} onSearch={setSearch} />
      <main className="content-grid">
        <aside className="sidebar" aria-label="Navegação">
          <nav className="sidebar__nav">
            {navigation.map(({ label, icon: Icon, active }) => (
              <button
                className={`sidebar__link${active ? ' sidebar__link--active' : ''}`}
                key={label}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <p className="sidebar__note">colecione lugares, não coisas ✈</p>
        </aside>

        <section className="feed" aria-label="Feed de publicações">
          <div className="stories" aria-label="Stories">
            {stories.map((story) => (
              <button className="story" type="button" key={story.user} aria-label={`Story de ${story.user}`}>
                <span className="story__ring">
                  <img src={story.avatar} alt="" />
                </span>
                <span className="story__name">{story.user}</span>
              </button>
            ))}
          </div>

          <div className="feed__intro">
            <div>
              <p className="eyebrow">AQUI SÓ TEM VIAGEM</p>
              <h1>O mundo é logo ali</h1>
            </div>
            <span className="feed__sparkle" aria-hidden="true">✳</span>
          </div>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="empty-state">
              <FiSearch aria-hidden="true" />
              <h2>Nada por aqui ainda</h2>
              <p>Tente buscar por outra pessoa ou palavra.</p>
            </div>
          )}
          <p className="feed__end">inspire-se, faça as malas e vá <span>✈</span></p>
        </section>

        <aside className="recommendations">
          <div className="my-profile">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80" alt="" />
            <div className="my-profile__text">
              <strong>seu.proximo.destino</strong>
              <span>Qual vai ser a próxima parada?</span>
            </div>
            <button type="button" className="text-button">Alternar</button>
          </div>

          <div className="recommendations__heading">
            <span>Sugestões para você</span>
            <button type="button" className="text-button text-button--dark">Ver tudo</button>
          </div>
          <div className="suggestion-list">
            {suggestions.map((person) => (
              <div className="suggestion" key={person.user}>
                <img src={person.avatar} alt="" />
                <div className="suggestion__text">
                  <strong>{person.user}</strong>
                  <span>{person.name}</span>
                </div>
                <button type="button" className="text-button">Seguir</button>
              </div>
            ))}
          </div>

          <p className="recommendations__quote">
            “Viajar é trocar a roupa da alma.”
            <span>— Mario Quintana</span>
          </p>
          <p className="recommendations__footer">Sobre · Ajuda · Imprensa · Privacidade · Termos</p>
          <p className="recommendations__copyright">© 2026 INSTAGRÃO</p>
        </aside>
      </main>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        <button type="button" aria-label="Início"><FiHome /></button>
        <button type="button" aria-label="Pesquisar"><FiSearch /></button>
        <button type="button" aria-label="Criar publicação"><FiPlusSquare /></button>
        <button type="button" aria-label="Atividades"><FiHeart /></button>
        <button type="button" aria-label="Perfil"><FiUser /></button>
      </nav>
    </div>
  )
}

export default App
