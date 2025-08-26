function entrar() {
  const usuario = document.querySelector('#usuario').value.trim();
  const senha = document.querySelector('#senha').value.trim();
  const pin = document.querySelector('#pin').value.trim();

  const userLabel = document.querySelector('#userLabel');
  const senhaLabel = document.querySelector('#senhaLabel');
  const pinLabel = document.querySelector('#pinLabel');
  const msgError = document.querySelector('#msgError');

  // Busca lista de usuários no localStorage, ou array vazio
  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  // Procura usuário válido com login completo (usuário + senha + pin)
  const validUser = listaUser.find(user => 
    user.userCad === usuario &&
    user.senhaCad === senha &&
    user.pinCad === pin
  );

  if (validUser) {
    // Login bem sucedido, salva userLogado e token
    localStorage.setItem('userLogado', JSON.stringify(validUser));
    const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
    localStorage.setItem('token', token);

    // Redireciona para agendamento
    window.location.href = '/paginas/agendamento.html';
  } else {
    // Exibe erro de login
    userLabel.style.color = 'red';
    senhaLabel.style.color = 'red';
    pinLabel.style.color = 'red';
    document.querySelector('#usuario').style.borderColor = 'red';
    document.querySelector('#senha').style.borderColor = 'red';
    document.querySelector('#pin').style.borderColor = 'red';

    msgError.style.display = 'block';
    msgError.textContent = 'Usuário, senha ou PIN incorretos';

    // Foca no primeiro campo vazio ou no usuário
    if (!usuario) {
      document.querySelector('#usuario').focus();
    } else if (!senha) {
      document.querySelector('#senha').focus();
    } else if (!pin) {
      document.querySelector('#pin').focus();
    } else {
      document.querySelector('#usuario').focus();
    }
  }
}

// Impede o submit padrão e chama entrar()
document.querySelector('#loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  entrar();
});
