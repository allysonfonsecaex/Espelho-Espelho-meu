import { FiHeart, FiMessageCircle, FiPlusSquare, FiSearch } from 'react-icons/fi'

function Header({ search, onSearch }) {
  return (
    <header className="header">
      <a className="header__logo" href="/" aria-label="Instagrão Viagens, início">instagrão<span>✈</span></a>
      <label className="header__search">
        <FiSearch aria-hidden="true" />
        <span className="visually-hidden">Buscar no feed</span>
        <input
          type="search"
          placeholder="Buscar destinos"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>
      <nav className="header__actions" aria-label="Atalhos">
        <button className="icon-button" type="button" aria-label="Criar publicação"><FiPlusSquare /></button>
        <button className="icon-button" type="button" aria-label="Mensagens"><FiMessageCircle /></button>
        <button className="icon-button" type="button" aria-label="Atividades"><FiHeart /></button>
        <img
          className="header__avatar"
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80"
          alt="Seu perfil"
        />
      </nav>
    </header>
  )
}

export default Header
