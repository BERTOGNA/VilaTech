import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Chrome, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError('Falha ao entrar. Verifique seu e-mail e senha.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Falha ao entrar com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans text-white">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-900 rounded-3xl shadow-2xl border border-white/5 mb-6">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Vila Tech Hub</h1>
          <p className="text-neutral-500 mt-2 font-medium">Painel Administrativo CRM</p>
        </div>

        <div className="bg-[#111111] rounded-[2.5rem] shadow-2xl border border-white/5 p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
                <input
                   type="email"
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-black/40 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all text-white font-medium placeholder:text-neutral-700"
                   placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
                <input
                   type="password"
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-black/40 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all text-white font-medium placeholder:text-neutral-700"
                   placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-black rounded-2xl font-bold hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                'Entrar no Painel'
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#111111] text-neutral-600 font-bold uppercase tracking-widest">ou</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-neutral-900 border border-neutral-800 text-white rounded-2xl font-bold hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            Acessar com Google
          </button>
        </div>
        
        <p className="text-center mt-10 text-sm text-neutral-600 font-medium">
          Dificuldade para acessar? <a href="mailto:contato@vilatechub.com.br" className="text-white hover:underline">Solicite suporte</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
