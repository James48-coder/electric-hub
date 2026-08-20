import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, Mail, Lock, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginRoute,
})

function LoginRoute() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shrink-0">
        <div className="flex justify-center text-amber-500">
          <Zap className="w-12 h-12 p-2 bg-amber-100 rounded-xl shrink-0" />
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isLogin ? 'Вход в ВольтПро' : 'Регистрация'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isLogin ? 'Рады видеть вас снова' : 'Создайте аккаунт для сохранения смет'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shrink-0">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Поле имени показывается только при регистрации */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Ваше имя
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-slate-400 shrink-0" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none block w-full pl-10 pr-3 py-2 sm:py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
              </div>
            )}

            {/* Поле Email (общее) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email адрес
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 sm:py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                  placeholder="mail@example.com"
                />
              </div>
            </div>

            {/* Поле Пароль (общее) */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Пароль
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 sm:py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Запомнить меня и Забыли пароль */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Запомнить меня
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                    Забыли пароль?
                  </a>
                </div>
              )}
            </div>

            {/* Главная кнопка отправки формы */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
              >
                {isLogin ? (
                  <>
                    <LogIn className="w-5 h-5 mr-2 shrink-0" />
                    Войти в систему
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2 shrink-0" />
                    Зарегистрироваться
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Переключатель Вход/Регистрация */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  {isLogin ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border-2 border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                {isLogin ? 'Создать новый аккаунт' : 'Войти в существующий аккаунт'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Кнопка возврата */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            &larr; Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
