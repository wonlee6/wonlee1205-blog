type AlertProps = {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'error'
}

export default function Alert({ children, type = 'info' }: AlertProps) {
  const base = 'p-4 my-4 rounded font-semibold border-l-4'
  const typeClass =
    type === 'info'
      ? 'bg-blue-50 border-blue-400 text-blue-700'
      : type === 'warning'
        ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
        : 'bg-red-50 border-red-400 text-red-700'

  return <div className={`${base} ${typeClass}`}>{children}</div>
}
