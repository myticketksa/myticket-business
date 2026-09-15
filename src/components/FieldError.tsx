export default function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="animate-fade-in-fast mt-1 text-xs text-red-600">{message}</p>
}
