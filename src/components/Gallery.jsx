import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
} from '../reducers/favouritesReducer.js'
import PhotoCard from './PhotoCard.jsx'
import SearchBar from './SearchBar.jsx'
import Spinner from './Spinner.jsx'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // keep favourites in localStorage so they survive a refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      /* storage can be blocked, the app still works without it */
    }
  }, [favourites])

  // stable function identity, so the input and the memoised cards don't get a new prop every render
  const handleSearch = useCallback((e) => setQuery(e.target.value), [])
  const toggleFavourite = useCallback(
    (id) => dispatch({ type: 'TOGGLE_FAVOURITE', id }),
    []
  )

  // only re-filter when the photos or the query change, not on every favourite toggle
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Photo Gallery</h1>
        <SearchBar value={query} onChange={handleSearch} />
      </header>
      <div className="mb-8 h-px bg-gradient-to-r from-sky/60 via-line to-ember/60" />

      {loading && <Spinner />}

      {error && !loading && (
        <div className="mx-auto max-w-sm rounded-2xl border border-line bg-white px-5 py-6 text-center">
          <p className="text-sm font-medium">Could not load photos</p>
          <p className="mt-1 text-sm text-muted">{error}. Check your connection and refresh the page.</p>
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-20 text-center text-sm text-muted">No photos found for that author.</p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <section className="grid grid-cols-1 gap-x-5 gap-y-7 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={toggleFavourite}
            />
          ))}
        </section>
      )}
    </>
  )
}
