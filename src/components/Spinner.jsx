export default function Spinner() {
  return (
    <div className="flex justify-center py-24" role="status" aria-label="Loading photos">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-sky" />
    </div>
  )
}
