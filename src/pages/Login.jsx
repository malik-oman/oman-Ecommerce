import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState('Sign Up')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [focusedField, setFocusedField] = useState(null)

  // Handle form submission with navigation
  const onSubmitHandler = async (e) => { 
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSuccess(true)
    
    // Redirect to home page after 1.5 seconds
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const toggleState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
    setFormData({ name: '', email: '', password: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className={`relative w-full max-w-md transition-all duration-700 ${isSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 mb-4 shadow-lg shadow-gray-900/20">
                {currentState === 'Login' ? (
                  <Lock className="w-8 h-8 text-white" />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              
              <div className="relative inline-block">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              
              <p className="mt-2 text-gray-500 text-sm">
                {currentState === 'Login' 
                  ? 'Sign in to access your account' 
                  : 'Join us for exclusive deals and offers'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="space-y-5">
              {/* Name Field - Only for Sign Up */}
              {currentState === 'Sign Up' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                  <div className={`relative group transition-all duration-300 ${focusedField === 'name' ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-gray-900' : 'text-gray-400'}`} />
                    </div>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-gray-900' : 'text-gray-400'}`} />
                  </div>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-gray-900' : 'text-gray-400'}`} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between text-sm pt-2">
                {currentState === 'Login' && (
                  <button 
                    type="button"
                    className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                )}
                {currentState === 'Sign Up' && <div />}
                
                <button
                  type="button"
                  onClick={toggleState}
                  className="text-gray-900 font-semibold hover:underline transition-all"
                >
                  {currentState === 'Login' ? 'Create account' : 'Sign in instead'}
                </button>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{currentState === 'Login' ? 'Signing in...' : 'Creating account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{currentState === 'Login' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure SSL Encryption</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center mt-6 text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-gray-900 hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 hover:underline">Privacy Policy</a>
        </p>
      </div>

      {/* Success Overlay with Redirect Message */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-in zoom-in-95 duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentState === 'Login' ? 'Welcome Back!' : 'Account Created!'}
            </h3>
            <p className="text-gray-600 mb-4">
              {currentState === 'Login' 
                ? 'Login successful! Redirecting...' 
                : 'Account created successfully! Redirecting...'}
            </p>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-[shrink_1.5s_ease-out_forwards]" style={{
                animation: 'shrink 1.5s ease-out forwards'
              }} />
            </div>
            <style>{`
              @keyframes shrink {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login