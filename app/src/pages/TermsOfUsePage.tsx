import { useEffect } from 'react';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

export default function TermsOfUsePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-brand-teal selection:text-white">
      <SEO 
        title="Termos de Uso | Instituto Cultural e Educacional Vila Tech"
        description="Termos de uso do site do Instituto Cultural e Educacional Vila Tech."
      />
      <TopNavigation variant="institute" />

      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
          Termos de Uso
        </h1>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 leading-relaxed">
          <p className="text-zinc-400 text-sm"> Última atualização: 7 de julho de 2026 </p>

          <p>
            Bem-vindo ao site do <strong>Instituto Cultural e Educacional Vila Tech</strong>. Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Caso não concorde com qualquer termo, solicitamos que não utilize o site.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">1. Uso do Conteúdo</h2>
          <p>
            Todo o material disponível neste site, incluindo textos, logotipos, imagens, vídeos, designs e código-fonte, é de propriedade do Instituto Cultural e Educacional Vila Tech ou de seus licenciadores, sendo protegido pelas leis de propriedade intelectual vigentes. O uso não autorizado de qualquer material contido no site é estritamente proibido.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">2. Conduta do Usuário</h2>
          <p>
            Ao utilizar o site e enviar informações através de nossos formulários de contato, você se compromete a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer dados cadastrais verídicos, precisos e atualizados.</li>
            <li>Não utilizar o site para fins ilegais ou prejudiciais à imagem e integridade do Instituto ou de terceiros.</li>
            <li>Não tentar interferir no funcionamento técnico do site ou acessar áreas restritas do sistema.</li>
          </ul>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">3. Foco Não-Comercial do Instituto</h2>
          <p>
            O Instituto Cultural e Educacional Vila Tech é uma associação civil sem fins lucrativos. As seções destinadas ao Instituto possuem caráter informativo, cultural e social, visando à transparência pública de seus projetos, ações e formas de voluntariado e apoio da comunidade.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">4. Limitação de Responsabilidade</h2>
          <p>
            O Instituto se esforça para manter as informações do site atualizadas e corretas. Contudo, não nos responsabilizamos por indisponibilidades temporárias do sistema por motivos de força maior, nem por links de terceiros eventualmente referenciados no site, os quais possuem políticas de privacidade e termos próprios.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">5. Alterações nos Termos</h2>
          <p>
            O Instituto reserva-se o direito de alterar estes Termos de Uso a qualquer momento, visando à adequação legal ou técnica. Recomendamos a leitura periódica deste documento.
          </p>

          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-8">6. Foro</h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil, sendo eleito o foro da Comarca de Itu - SP para dirimir quaisquer dúvidas ou litígios decorrentes do uso do site.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
