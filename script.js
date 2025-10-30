//
// Arquivo script.js para o site RB Paver
//

// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    console.log("Site RB Paver (Design Minimalista) carregado.");

    // --- Lógica 1: Inicialização do Swiper (Apenas para a Home) ---
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
        const selectModelo = document.getElementById('modelo-paver'); // <- MUDOU AQUI
        const btnCalcular = document.getElementById('btn-calcular');

        // Seleciona os campos de resultado
        const resArea = document.getElementById('res-area');
        const resPecas = document.getElementById('res-pecas');
        const resPreco = document.getElementById('res-preco');
        
        // Seleciona o formulário de envio do WhatsApp
        const formWhatsapp = document.getElementById('form-envio-whatsapp');
        
        // --- NOVA LÓGICA DE DADOS ---
        // Tabela de dados para cada modelo de paver
        const dadosModelos = {
            'p6_35': {
                precoM2: 75.50,  // Preço antigo 'Leve'
                pecasM2: 50      // Todos são 10x20 (retangular)
            },
            'p8_35': {
                precoM2: 95.00,  // Preço antigo 'Médio'
                pecasM2: 50
            },
            'p8_50': {
                precoM2: 120.00, // Preço antigo 'Pesado'
                pecasM2: 50
            },
            'p10_50': {
                precoM2: 120.00, // Preço antigo 'Pesado' (pode ajustar se for mais caro)
                pecasM2: 50
            }
        };
        
        // Função para formatar como Moeda (R$)
        function formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        
        // Função principal do cálculo (ATUALIZADA)
        function calcularEstimativa() {
            const largura = parseFloat(inputLargura.value) || 0;
            const comprimento = parseFloat(inputComprimento.value) || 0;
            const modeloSelecionado = selectModelo.value; // Ex: 'p6_35'

            const area = largura * comprimento;
            
            // Pega os dados corretos da tabela
            const dadosDoModelo = dadosModelos[modeloSelecionado];
            
            // Cálculos
            const precoEstimado = area * dadosDoModelo.precoM2;
            const pecasEstimadas = Math.ceil(area * dadosDoModelo.pecasM2); // Arredonda para cima

            // Atualiza os resultados na tela
            resArea.textContent = `${area.toFixed(2)} m²`;
            resPecas.textContent = `${pecasEstimadas} peças`;
            resPreco.textContent = formatarMoeda(precoEstimado);
        }
        
        // Adiciona o "escutador" ao botão
        btnCalcular.addEventListener('click', calcularEstimativa);
        
        // --- Lógica 3: Envio do Formulário WhatsApp (ATUALIZADA) ---
        
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
                // Pega o TEXTO da opção selecionada (Ex: "Paver 10x20x06 35 Mpa...")
                modelo: selectModelo.options[selectModelo.selectedIndex].text,
            };

            // Monta a mensagem (ATUALIZADA)
            const mensagem = `Olá, RB Paver!
Meu nome é *${nomeCliente}* (${whatsappCliente}).
Gostaria de um orçamento baseado na simulação do site:

*Projeto:*
- Área Total: *${dadosOrcamento.area}*
- Modelo de Paver: *${dadosOrcamento.modelo}*

*Estimativa (Material):*
- Peças (Aprox.): *${dadosOrcamento.pecas}*
- Preço (Aprox.): *${dadosOrcamento.preco}*

Aguardo contato para agendar uma visita técnica. Obrigado!`;

            // Cria o link e abre em nova aba
            const urlWhatsapp = `https://wa.me/${telefoneVendedor}?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsapp, '_blank');
        });
    }

}); // Fim do 'DOMContentLoaded'