//
// Arquivo script.js para o site RB Paver
//

// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    console.log("Site RB Paver (Design Minimalista) carregado.");

    // --- Lógica 1: Inicialização do Swiper (Apenas para a Home) ---
    // Esta lógica é inspirada no script do site Allana
    // Verificamos se o elemento .swiper existe antes de iniciá-lo
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }

    // --- Lógica 2: Calculadora de Orçamento (Apenas para a calculadora.html) ---
    const calculadoraForm = document.getElementById('calculadora-form');
    
    // Só executa a lógica da calculadora se estivermos na página certa
    if (calculadoraForm) {
        
        // Seleciona os elementos do formulário
        const inputLargura = document.getElementById('largura');
        const inputComprimento = document.getElementById('comprimento');
        const selectUso = document.getElementById('tipo-uso');
        const selectPaver = document.getElementById('tipo-paver');
        const btnCalcular = document.getElementById('btn-calcular');

        // Seleciona os campos de resultado
        const resArea = document.getElementById('res-area');
        const resPecas = document.getElementById('res-pecas');
        const resPreco = document.getElementById('res-preco');
        
        // Seleciona o formulário de envio do WhatsApp
        const formWhatsapp = document.getElementById('form-envio-whatsapp');
        
        // --- VALORES APROXIMADOS (Como você pediu) ---
        const precosBaseM2 = {
            'leve': 75.50,   // Ex: R$ 75,50/m² (jardim)
            'medio': 95.00,  // Ex: R$ 95,00/m² (carros)
            'pesado': 120.00 // Ex: R$ 120,00/m² (caminhões)
        };
        const pecasPorM2 = {
            'retangular': 50, // 50 peças por m²
            'hexagonal': 28,  // 28 peças por m²
            'onda': 39,       // 39 peças por m²
        };
        
        // Função para formatar como Moeda (R$)
        function formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        
        // Função principal do cálculo
        function calcularEstimativa() {
            const largura = parseFloat(inputLargura.value) || 0;
            const comprimento = parseFloat(inputComprimento.value) || 0;
            const tipoUso = selectUso.value;
            const tipoPaver = selectPaver.value;

            const area = largura * comprimento;
            
            // Cálculos com base nos valores aproximados
            const precoEstimado = area * precosBaseM2[tipoUso];
            const pecasEstimadas = Math.ceil(area * pecasPorM2[tipoPaver]); // Arredonda para cima

            // Atualiza os resultados na tela
            resArea.textContent = `${area.toFixed(2)} m²`;
            resPecas.textContent = `${pecasEstimadas} peças`;
            resPreco.textContent = formatarMoeda(precoEstimado);
        }
        
        // Adiciona o "escutador" ao botão
        btnCalcular.addEventListener('click', calcularEstimativa);
        
        // --- Lógica 3: Envio do Formulário WhatsApp ---
        // Inspirado na lógica do site Allana
        
        formWhatsapp.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Número do vendedor (do site antigo)
            const telefoneVendedor = '554188884331'; // Apenas números, com código do país/cidade
            
            // Pega os dados do cliente
            const nomeCliente = document.getElementById('nome-cliente').value;
            const whatsappCliente = document.getElementById('whatsapp-cliente').value;
            
            // Pega os dados do orçamento (que já calculamos)
            const dadosOrcamento = {
                area: resArea.textContent,
                pecas: resPecas.textContent,
                preco: resPreco.textContent,
                uso: selectUso.options[selectUso.selectedIndex].text,
                paver: selectPaver.options[selectPaver.selectedIndex].text,
            };

            // Monta a mensagem
            const mensagem = `Olá, RB Paver!
Meu nome é *${nomeCliente}* (${whatsappCliente}).
Gostaria de um orçamento baseado na simulação do site:

*Projeto:*
- Área Total: *${dadosOrcamento.area}*
- Tipo de Uso: *${dadosOrcamento.uso}*
- Tipo de Paver: *${dadosOrcamento.paver}*

*Estimativa:*
- Peças (Aprox.): *${dadosOrcamento.pecas}*
- Preço (Aprox.): *${dadosOrcamento.preco}*

Aguardo contato para agendar uma visita técnica. Obrigado!`;

            // Cria o link e abre em nova aba
            const urlWhatsapp = `https://wa.me/${telefoneVendedor}?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsapp, '_blank');
        });
    }

}); // Fim do 'DOMContentLoaded'