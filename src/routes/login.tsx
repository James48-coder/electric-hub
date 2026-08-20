import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Zap, Mail, Lock, LogIn, UserPlus, Loader2 } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginRoute,
})

function LoginRoute() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Имитируем работу сервера (задержка 1 секунда для показа спиннера)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Выдаем успешное сообщение в зависимости от того, вход это или регистрация
      if (isLogin) {
        setMessage(`С возвращением! Заходим в аккаунт...`)
      } else {
        setMessage(`Супер! Аккаунт для ${email} успешно создан.`)
      }

      // Перекидываем пользователя в Личный кабинет через 1.5 секунды
      setTimeout(() => {
        navigate({ to: '/profile' })
      }, 1500)
      
    } catch (err) {
      setMessage('Ошибка соединения с сервером. Проверьте интернет.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shrink-0">
        <div className="flex justify-center text-amber-500">
          <Zap className="w-12 h-12 p-2 bg-amber-100 rounded-xl shrink-0" />
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isLogin ? 'Вход в ВольтПро' : 'Регистрация'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shrink-0">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">

          {/* Блок вывода сообщений */}
          {message && (
            <div className={`mb-4 p-3 rounded-xl text-sm text-center font-medium ${message.includes('успешн') || message.includes('возвращением') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Ваше имя</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-slate-400 shrink-0" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Иван Иванов"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">Email адрес</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="mail@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Пароль</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                <><LogIn className="w-5 h-5 mr-2" />Войти в систему</>
              ) : (
                <><UserPlus className="w-5 h-5 mr-2" />Зарегистрироваться</>
              )}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
              className="w-full flex justify-center py-3 px-4 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {isLogin ? 'Создать новый аккаунт' : 'Войти в существующий аккаунт'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            &larr; Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
