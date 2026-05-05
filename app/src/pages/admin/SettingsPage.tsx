import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import api from '../../services/api';
import { 
  User, 
  Bell, 
  Shield, 
  Save, 
  Building2,
  Mail,
  Loader2
} from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [unitName, setUnitName] = useState('');
  const [unitEmail, setUnitEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        setUnitName(response.data.unitName || '');
        setUnitEmail(response.data.unitEmail || '');
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.post('/settings', { unitName, unitEmail });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (auth && user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        setResetSent(true);
        setTimeout(() => setResetSent(false), 5000);
        alert(`Um e-mail de redefinição de senha foi enviado para ${user.email}`);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        alert("Erro ao enviar e-mail de redefinição de senha. Por favor, tente novamente.");
      }
    } else if (!auth) {
      alert("Configuração do Firebase não encontrada. Verifique seu arquivo .env.local.");
    } else {
      alert("Não foi possível encontrar o e-mail do usuário para redefinir a senha.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Configurações</h1>
        <p className="text-neutral-500 mt-2 font-medium">Gerencie suas preferências e configurações da conta Vila Tech.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-3xl border border-neutral-800 shadow-sm">
            <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
            <p className="text-neutral-500 font-bold">Carregando configurações...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] rounded-3xl border border-neutral-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Perfil do Usuário</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-neutral-500 mb-2">E-mail de Acesso</label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" 
                      disabled 
                      value={user?.email || ''} 
                      className="w-full pl-12 pr-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl text-neutral-600 font-medium cursor-not-allowed" 
                    />
                  </div>
                  <p className="text-[10px] text-neutral-600 mt-2 italic">* O e-mail não pode ser alterado diretamente.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-500 mb-2">Nome de Exibição</label>
                  <input 
                    type="text" 
                    defaultValue={user?.email?.split('@')[0]} 
                    className="w-full px-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all font-medium text-white" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] rounded-3xl border border-neutral-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Configurações da Unidade</h2>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-neutral-500 mb-2">Nome da Unidade Vila Tech</label>
                <input 
                  type="text" 
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all font-medium text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-500 mb-2">E-mail para Notificações de Novos Leads</label>
                <input 
                  type="email" 
                  value={unitEmail}
                  onChange={(e) => setUnitEmail(e.target.value)}
                  placeholder="comercial@vilatech.com.br" 
                  className="w-full px-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all font-medium text-white placeholder:text-neutral-700" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-[#111111] rounded-3xl border border-neutral-800 shadow-sm p-6 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-600 mb-4">Segurança e Acesso</h3>
            
            <button 
              onClick={handlePasswordReset}
              className="w-full flex items-center justify-between p-3 hover:bg-neutral-800/50 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Shield className={`w-5 h-5 ${resetSent ? 'text-green-500' : 'text-neutral-600 group-hover:text-white'}`} />
                <span className="text-sm font-bold text-neutral-400">Alterar Senha</span>
              </div>
              <span className="text-[10px] font-black text-white bg-neutral-800 px-2 py-1 rounded-lg uppercase">Resetar</span>
            </button>

            <div className="flex items-center justify-between p-3 hover:bg-neutral-800/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-neutral-600" />
                <span className="text-sm font-bold text-neutral-400">Notificações</span>
              </div>
              <div className="w-12 h-6 bg-white rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-neutral-800/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-neutral-600" />
                <span className="text-sm font-bold text-neutral-400">Segurança 2FA</span>
              </div>
              <div className="w-12 h-6 bg-neutral-800 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-neutral-700 rounded-full"></div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl ${success ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-neutral-200'} disabled:opacity-50`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : success ? (
              <>Salvo com Sucesso!</>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default SettingsPage;
