import { memo } from 'react'

function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-2xl bg-paper">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-1 pt-2.5">
        <p className="truncate pr-2 text-sm text-ink">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="rounded-full p-1.5 text-muted transition-colors hover:bg-paper hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-sky/40"
        >
          <svg
            className={`h-[18px] w-[18px] ${isFavourite ? 'text-ember' : ''}`}
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.5 5 6.6 5c1.9 0 3.5 1 4.4 2.5h2C13.9 6 15.5 5 17.4 5c3.1 0 4.9 3 3.8 6.2-1.7 4.7-9.2 9.3-9.2 9.3Z" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default memo(PhotoCard)
