// =====================================================================
// LOGIN FORM - Responsivo: Mobile → Tablet → Desktop
// =====================================================================
// REGRAS FUNDAMENTAIS DE DESIGN RESPONSIVO (Tailwind):
//
//  Breakpoints padrão do Tailwind:
//  sm:  ≥ 640px   → tablet pequeno
//  md:  ≥ 768px   → tablet
//  lg:  ≥ 1024px  → desktop
//  xl:  ≥ 1280px  → desktop grande
//
//  FILOSOFIA: "Mobile First"
//  → Escreva o estilo base PARA MOBILE, depois adicione prefixos
//    (sm:, md:, lg:) para SOBRESCREVER em telas maiores.
//
// =====================================================================

import { useState } from "react";
import { Link } from "react-router-dom";

// --- COMPONENTES FICTÍCIOS (substitua pelos seus reais) ---
const Logo = () => (
  <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
    <span className="text-white text-xs font-bold">C</span>
  </div>
);

const InputText = ({ label, id, error, ...props }) => (
  <div className="flex flex-col gap-1 text-left">
    {/* ✅ ACESSIBILIDADE: label sempre associado ao input via htmlFor + id */}
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`
        w-full px-3 py-2 border rounded-lg text-sm
        focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent
        transition-all duration-200
        ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}
        ${props.className || ""}
      `}
      {...props}
    />
    {/* ✅ Mensagem de erro acessível por leitores de tela */}
    {error && (
      <span role="alert" className="text-xs text-red-500">
        {error}
      </span>
    )}
  </div>
);
// ----------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Validação client-side antes de enviar
  const validate = () => {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Insira um e-mail válido.";
    if (password.length < 8)
      newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Substitua pela sua chamada de API real
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Login enviado:", { email, password });
    } catch (err) {
      setErrors({ form: "Erro ao fazer login. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /*
     * CAMADA EXTERNA: centraliza o card na tela inteira
     *
     * min-h-screen       → ocupa pelo menos 100% da altura da viewport
     * flex + items/justify-center → centraliza vertical e horizontal
     * bg-gray-50         → fundo suave para destacar o card
     * p-4                → padding mínimo nas bordas em mobile (evita card colado na borda)
     */
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      {/*
       * CARD DO FORMULÁRIO
       *
       * w-full             → 100% de largura em mobile (sem espaço desperdiçado)
       * max-w-sm           → limita a largura máxima em ~384px (ótimo para formulários)
       *   ↳ Em sm: e acima o card para de crescer e fica centralizado
       *
       * ❌ EVITE: larguras fixas como w-64 — quebram em telas pequenas
       * ✅ USE: w-full + max-w-{tamanho} para flexibilidade
       *
       * rounded-2xl        → bordas arredondadas
       * shadow-lg          → sombra para elevação visual
       * bg-white           → fundo branco do card
       * p-6 sm:p-8        → padding menor em mobile, maior em tablet+
       *   ↳ MOBILE FIRST: defina o menor valor no base, aumente com prefixo
       */}
      <section className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-6 sm:p-8">

        {/*
         * FORM: onSubmit centraliza o controle de envio
         * noValidate → desativa validação nativa do browser (usamos a nossa)
         */}
        <form onSubmit={handleSubmit} noValidate>

          {/* CABEÇALHO */}
          <div className="flex items-center gap-3 mb-6">
            <Logo />
            {/*
             * text-2xl sm:text-3xl → texto menor em mobile, maior em tablet
             * REGRA: fontes também devem ser responsivas
             */}
            <span className="font-semibold text-2xl sm:text-3xl text-gray-900">
              Ceagro
            </span>
          </div>

          {/* CAMPOS DO FORMULÁRIO */}
          {/*
           * flex flex-col gap-4 → empilha os campos verticalmente com espaço entre eles
           * gap-4 → 16px de espaço. Consistência aqui é fundamental.
           */}
          <div className="flex flex-col gap-4">

            {/* ✅ InputText com label visível — acessibilidade e UX */}
            <InputText
              label="E-mail"
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="seu@email.com"
              required
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
              /*
               * autoComplete → ajuda o browser a preencher automaticamente
               * Valores comuns: "email", "current-password", "new-password", "name"
               */
              autoComplete="email"
            />

            <InputText
              label="Senha"
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Mínimo 8 caracteres"
              required
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* ERRO GERAL DO FORMULÁRIO (ex: erro de servidor) */}
          {errors.form && (
            <p role="alert" className="mt-3 text-sm text-red-500 text-center">
              {errors.form}
            </p>
          )}

          {/*
           * BOTÃO DE SUBMIT
           *
           * w-full          → botão ocupa toda a largura (padrão em mobile)
           * mt-6            → espaço acima do botão
           * py-2.5          → padding vertical confortável para toque (mínimo 44px de área)
           * disabled        → desativa durante o loading para evitar duplo envio
           *
           * ✅ REGRA MOBILE: áreas clicáveis devem ter no mínimo 44x44px
           */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full mt-6 py-2.5 px-4
              bg-sky-500 hover:bg-sky-600 active:bg-sky-700
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-medium text-sm rounded-lg
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
            "
          >
            {isLoading ? "Entrando..." : "Acessar"}
          </button>

          {/*
           * RODAPÉ COM LINK DE CADASTRO
           * text-center + mt-4 → centraliza e separa do botão
           */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem cadastro?{" "}
            <Link
              to="/usuarios/cadastro"
              className="text-sky-500 hover:text-sky-700 font-medium underline-offset-2 hover:underline transition-colors"
            >
              Cadastre-se
            </Link>
          </p>

        </form>
      </section>
    </div>
  );
}

// =====================================================================
// RESUMO DAS REGRAS DE DESIGN RESPONSIVO
// =====================================================================
//
// 1. MOBILE FIRST
//    Escreva o estilo base para a menor tela, depois sobrescreva:
//    ✅ text-xl sm:text-2xl lg:text-3xl
//    ❌ text-3xl (sem responsividade)
//
// 2. EVITE TAMANHOS FIXOS
//    ✅ w-full max-w-sm   → flexível e limitado
//    ❌ w-96              → pode estourar em telas pequenas
//
// 3. EVITE ALTURAS FIXAS EM CONTAINERS
//    ✅ min-h-screen, py-8 (padding)
//    ❌ h-75 (trava e pode cortar conteúdo)
//
// 4. PADDING RESPONSIVO
//    ✅ p-4 sm:p-6 md:p-8
//    → Mais espaço conforme a tela cresce
//
// 5. TIPOGRAFIA RESPONSIVA
//    ✅ text-base sm:text-lg
//    → Não use fonte grande em mobile
//
// 6. ACESSIBILIDADE (sempre!)
//    → <label htmlFor> em todo input
//    → role="alert" em mensagens de erro
//    → focus:ring nos elementos interativos
//    → disabled no botão durante loading
//    → autoComplete nos campos de formulário
//
// 7. ÁREAS DE TOQUE (mobile)
//    → Botões e links devem ter no mínimo 44px de altura
//    → Use py-2.5 ou py-3 para garantir isso
//
// =====================================================================