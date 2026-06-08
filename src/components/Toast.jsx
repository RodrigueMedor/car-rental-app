export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-slide-up ${
            toast.type === 'success' ? 'bg-green-600 text-white' :
            toast.type === 'error' ? 'bg-red-600 text-white' :
            toast.type === 'info' ? 'bg-primary-600 text-white' :
            'bg-gray-800 text-white'
          }`}
        >
          <span className="text-lg">
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '💬'}
          </span>
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>
        </div>
      ))}
    </div>
  )
}
