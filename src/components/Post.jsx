import { useState } from 'react'
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend,
} from 'react-icons/fi'

function Post({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.comments)
  const likeCount = post.likes + (liked ? 1 : 0)

  function addComment(event) {
    event.preventDefault()
    const text = comment.trim()
    if (!text) return
    setComments((currentComments) => [...currentComments, { user: 'seu.proximo.destino', text }])
    setComment('')
    setShowComments(true)
  }

  return (
    <article className="post">
      <header className="post__header">
        <span className="post__avatar-ring">
          <img className="post__avatar" src={post.avatar} alt="" />
        </span>
        <div className="post__user">
          <strong>{post.user}</strong>
          <span>{post.location}</span>
        </div>
        <button className="icon-button post__more" type="button" aria-label="Mais opções">
          <FiMoreHorizontal />
        </button>
      </header>

      <img className="post__image" src={post.image} alt={post.alt} />

      <div className="post__content">
        <div className="post__actions">
          <button
            className={`icon-button${liked ? ' icon-button--liked' : ''}`}
            type="button"
            aria-label={liked ? 'Descurtir' : 'Curtir'}
            aria-pressed={liked}
            onClick={() => setLiked((currentLiked) => !currentLiked)}
          >
            <FiHeart />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Comentar"
            aria-expanded={showComments}
            onClick={() => setShowComments((visible) => !visible)}
          >
            <FiMessageCircle />
          </button>
          <button className="icon-button" type="button" aria-label="Enviar">
            <FiSend />
          </button>
          <button
            className={`icon-button post__save${saved ? ' post__save--active' : ''}`}
            type="button"
            aria-label={saved ? 'Remover dos salvos' : 'Salvar'}
            aria-pressed={saved}
            onClick={() => setSaved((currentSaved) => !currentSaved)}
          >
            <FiBookmark />
          </button>
        </div>

        <p className="post__likes"><strong>{likeCount.toLocaleString('pt-BR')} curtidas</strong></p>
        <p className="post__caption">
          <strong>{post.user}</strong>
          <span>{post.caption}</span>
        </p>
        {comments.length > 0 && (
          <button
            className="post__view-comments"
            type="button"
            onClick={() => setShowComments((visible) => !visible)}
          >
            Ver todos os {comments.length} comentários
          </button>
        )}

        {showComments && (
          <div className="post__comments">
            {comments.map((item, index) => (
              <p key={`${item.user}-${index}`}>
                <strong>{item.user}</strong> {item.text}
              </p>
            ))}
          </div>
        )}

        <form className="post__comment-form" onSubmit={addComment}>
          <label className="visually-hidden" htmlFor={`comment-${post.id}`}>Adicione um comentário</label>
          <input
            id={`comment-${post.id}`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Adicione um comentário..."
          />
          <button type="submit" disabled={!comment.trim()}>Publicar</button>
        </form>
      </div>
    </article>
  )
}

export default Post
