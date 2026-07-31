import { useEffect } from 'react';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-brand-teal selection:text-white">
      <SEO
        title="Política de Privacidade | Instituto Cultural e Educacional Vila Tech"
        description="Esta política de privacidade descreve como o Instituto Cultural e Educacional Vila Tech coleta, usa e protege suas informações."
      />
      <TopNavigation variant="institute" />

      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
          Política de Privacidade
        </h1>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 leading-relaxed">
          <p className="text-zinc-400 text-sm"> Última atualização: 7 de julho de 2026 </p>

          <p>
            O <strong>Instituto Cultural e Educacional Vila Tech</strong>, inscrito no CNPJ sob o nº <strong>58.473.428/0001-31</strong>, com sede na Rua Francisco José Ferreira Sampaio, 90, Itu - SP, CEP 13303-536, valoriza a privacidade dos seus usuários e está comprometido com a proteção dos dados pessoais nos termos da Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">1. Coleta de Informações</h2>
          <p>
            Nós coletamos dados pessoais quando você voluntariamente entra em contato conosco por meio de nossos formulários no site. Os dados coletados incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone / WhatsApp</li>
            <li>Assunto e áreas de interesse selecionadas</li>
            <li>Mensagem de texto fornecida</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">2. Finalidade do Tratamento de Dados</h2>
          <p>
            Os dados coletados são utilizados única e exclusivamente para as seguintes finalidades:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responder a solicitações de contato, dúvidas e informações enviadas pelos formulários.</li>
            <li>Enviar atualizações sobre as atividades do Instituto (caso tenha se cadastrado na newsletter).</li>
            <li>Processar informações relacionadas a parcerias ou doações voluntárias.</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">3. Compartilhamento e Armazenamento</h2>
          <p>
            O Instituto Cultural e Educacional Vila Tech <strong>não compartilha, vende ou transfere</strong> seus dados pessoais para terceiros com fins comerciais. Os dados são armazenados em servidores seguros e acessados apenas por pessoal autorizado.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">4. Direitos do Titular</h2>
          <p>
            Você, como titular dos dados, tem o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou inexatos, e a exclusão definitiva dos seus dados de nossa base. Para exercer esses direitos, entre em contato via e-mail em <a href="mailto:atendimento@vilatechub.com.br" className="text-brand-teal hover:underline">atendimento@vilatechub.com.br</a>.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">5. Cookies e Tecnologias de Rastreamento</h2>
          <p>
            Utilizamos cookies básicos e ferramentas de análise de tráfego (como o Google Analytics) para entender como o site é utilizado e melhorar a experiência de navegação. Esses dados são coletados de forma agregada e anônima.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">6. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco pelo e-mail ou endereço físico constantes no rodapé deste site.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
