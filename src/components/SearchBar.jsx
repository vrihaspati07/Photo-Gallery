export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author"
        aria-label="Search photos by author"
        className="w-full rounded-full border border-line bg-white py-2 pl-9 pr-4 text-sm placeholder:text-muted/70 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
      />
    </div>
  )
}
