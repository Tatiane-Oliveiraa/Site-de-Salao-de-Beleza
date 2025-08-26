document.addEventListener('DOMContentLoaded', function () {
  // Verifica se o usuário está logado
  const usuarioStr = localStorage.getItem('userLogado');
  if (!usuarioStr) {
    alert("Você precisa estar logado para agendar.");
    window.location.href = '/paginas/login.html';
    return;
  }

  let usuario;
  try {
    usuario = JSON.parse(usuarioStr);
  } catch (error) {
    console.error("Erro ao analisar JSON:", error);
    alert("Erro ao carregar dados do usuário.");
    return;
  }

  // Exibe nome do usuário
  const welcomeUser = document.getElementById('welcome-user');
  if (welcomeUser && usuario && usuario.nome) {
    welcomeUser.textContent = `Olá, ${usuario.nome}!`;
  }

  // Exibe serviço, valor e imagem
  const servico = localStorage.getItem('servico');
  const valor = localStorage.getItem('valor');
  const imagem = localStorage.getItem('imagemServico');

  if (servico) {
    const nomeEl = document.getElementById('nome-servico');
    if (nomeEl) nomeEl.textContent = servico;
  }

  if (valor) {
    const valorEl = document.getElementById('valor-servico-exibe');
    if (valorEl) valorEl.textContent = valor;
  }

  if (imagem) {
    const imgEl = document.getElementById('imagem-servico');
    if (imgEl) imgEl.src = imagem;
  }

  // Botão voltar serviço
  const btnVoltar = document.getElementById('btn-voltar-servico');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      localStorage.removeItem('servico');
      localStorage.removeItem('valor');
      localStorage.removeItem('imagemServico');
      window.location.href = '../index.html'; // Altere se necessário
    });
  }

  // Verifica se é domingo
  function isDomingo(data) {
    return new Date(data).getDay() === 0;
  }

  // Submissão do formulário
  const form = document.getElementById('agendamento-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const mensagem = document.getElementById('mensagem').value;

      if (!data || !hora) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (isDomingo(data)) {
        alert("Não é possível agendar para domingo.");
        return;
      }

      const agendamento = {
        nome: usuario.nome,
        servico: servico,
        data: data,
        hora: hora,
        mensagem: mensagem
      };

      const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
      agendamentos.push(agendamento);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

      const confirmacao = document.getElementById('mensagem-confirmacao');
      if (confirmacao) {
        confirmacao.style.display = 'block';
        confirmacao.classList.add('show');
        confirmacao.innerHTML = `
          
          <strong>✅ Agendamento confirmado!</strong><br><br>
          <i class="fas fa-user"></i> <strong>Cliente:</strong> ${usuario.nome}<br>
          <i class="fas fa-scissors"></i> <strong>Serviço:</strong> ${servico}<br>
          <i class="fas fa-calendar-alt"></i> <strong>Data:</strong> ${data}<br>
          <i class="fas fa-clock"></i> <strong>Hora:</strong> ${hora}<br>
          <i class="fas fa-comment-dots"></i> <strong>Mensagem:</strong> ${mensagem || 'Nenhuma mensagem.'}
        `;
      }

      renderizarAgendamentos();
    });
  }

  // Renderiza a lista de agendamentos
  function renderizarAgendamentos() {
    const listaUl = document.getElementById('agendamentos-lista');
    if (!listaUl) return;

    listaUl.innerHTML = '';

    const todos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const meus = todos.filter(item => item.nome === usuario.nome);

    if (meus.length === 0) {
      listaUl.innerHTML = '<li>Você ainda não tem agendamentos.</li>';
    } else {
      meus.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <i class="fas fa-scissors"></i> <strong>${item.servico}</strong><br>
          <i class="fas fa-calendar-alt"></i> ${item.data} às ${item.hora}<br>
          <i class="fas fa-comment-dots"></i> ${item.mensagem || 'Nenhuma mensagem.'}<br>
          <button class="cancelar-btn" data-agendamento='${JSON.stringify(item)}'>
            <i class="fas fa-trash-alt"></i> Cancelar
          </button>
        `;
        listaUl.appendChild(li);
      });

      document.querySelectorAll('.cancelar-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const agendamentoStr = this.getAttribute('data-agendamento');
          const agendamento = JSON.parse(agendamentoStr);

          if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
            const todos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            const atualizados = todos.filter(item =>
              !(
                item.nome === agendamento.nome &&
                item.servico === agendamento.servico &&
                item.data === agendamento.data &&
                item.hora === agendamento.hora &&
                item.mensagem === agendamento.mensagem
              )
            );
            localStorage.setItem('agendamentos', JSON.stringify(atualizados));
            renderizarAgendamentos();
          }
        });
      });
    }
  }

  renderizarAgendamentos();
});

// Função de logout
window.logout = function () {
  localStorage.removeItem('userLogado');
  localStorage.removeItem('token');
  alert("Você foi desconectado.");
  window.location.href = '/paginas/login.html';
};
