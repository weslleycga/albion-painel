import { useState } from 'react'
import { urlImagemItem } from '../../services/albion'

// Imagem oficial do item. Se não carregar, mostra um ícone no lugar.
function ItemIcone({ itemId, tamanho = 64, alt = '' }) {
  const [falhou, setFalhou] = useState(false)

  if (falhou) {
    return (
      <div
        style={{ width: tamanho, height: tamanho }}
        className="flex items-center justify-center rounded-lg bg-stone-200 text-2xl dark:bg-stone-800"
      >
        📦
      </div>
    )
  }

  return (
    <img
      src={urlImagemItem(itemId, tamanho * 2)}
      alt={alt}
      width={tamanho}
      height={tamanho}
      loading="lazy"
      onError={() => setFalhou(true)}
    />
  )
}

export default ItemIcone
