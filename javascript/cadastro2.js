

// Seletores
let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let pin = document.querySelector('#pin');
let labelPin = document.querySelector('#labelPin');
let validPin = false;

let labelEmail = document.querySelector('#labelEmail');
let erroTelefone = document.querySelector('#erroTelefone');
let erroCpf = document.querySelector('#erroCpf');

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

document.querySelector('#cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  cadastrar();
});

// Validadores de campos de texto
nome.addEventListener('keyup', () => {
  validNome = nome.value.length > 2;
  nome.classList.toggle('error', !validNome);
  labelNome.classList.toggle('error', !validNome);
  labelNome.innerHTML = validNome ? 'Nome' : 'Nome *Insira no mínimo 3 caracteres';
});

usuario.addEventListener('keyup', () => {
  validUsuario = usuario.value.length > 4;
  usuario.classList.toggle('error', !validUsuario);
  labelUsuario.classList.toggle('error', !validUsuario);
  labelUsuario.innerHTML = validUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 5 caracteres';
});

senha.addEventListener('keyup', () => {
  validSenha = senha.value.length > 5;
  senha.classList.toggle('error', !validSenha);
  labelSenha.classList.toggle('error', !validSenha);
  labelSenha.innerHTML = validSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';
});

confirmSenha.addEventListener('keyup', () => {
  validConfirmSenha = senha.value === confirmSenha.value;
  confirmSenha.classList.toggle('error', !validConfirmSenha);
  labelConfirmSenha.classList.toggle('error', !validConfirmSenha);
  labelConfirmSenha.innerHTML = validConfirmSenha ? 'Confirmar Senha' : 'Confirmar Senha *As senhas não conferem';
});

pin.addEventListener('keyup', () => {
  validPin = pin.value.length > 3;
  pin.classList.toggle('error', !validPin);
  labelPin.classList.toggle('error', !validPin);
  labelPin.innerHTML = validPin ? 'PIN' : 'PIN *Insira no mínimo 4 caracteres';
});

// Validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let digito1 = (soma * 10) % 11;
  if (digito1 === 10) digito1 = 0;
  if (digito1 !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let digito2 = (soma * 10) % 11;
  if (digito2 === 10) digito2 = 0;

  return digito2 === parseInt(cpf[10]);
}

function validarCPFInput() {
  const cpfInput = document.getElementById('cpf');
  const cpf = cpfInput.value;
  const valido = validarCPF(cpf);
  cpfInput.classList.toggle('error', !valido);
  erroCpf.textContent = valido ? '' : 'CPF inválido!';
  return valido;
}

function formatarCPF(input) {
  let cpf = input.value.replace(/\D/g, '');
  if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
  if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3-$4');
  input.value = cpf;
}

// Validação de telefone
function validarTelefone() {
  const telefoneInput = document.getElementById('celular');
  const telefone = telefoneInput.value.replace(/\D/g, ''); // só números

  const regex = /^\d{11}$/; // XX + 5 dígitos + 4 dígitos
  const dddsValidos = ['11','12','13','14','15','16','17','18','19','21','22','24',
                       '27','28','31','32','33','34','35','37','38','41','42','43',
                       '44','45','46','47','48','49','51','53','54','55','61','62',
                       '63','64','65','66','67','68','69','71','73','74','75','77',
                       '79','81','82','83','84','85','86','87','88','89','91','92',
                       '93','94','95','96','97','98','99'];

  const ddd = telefone.substring(0, 2);
  const valido = regex.test(telefone) && dddsValidos.includes(ddd);

  telefoneInput.classList.toggle('error', !valido);
  erroTelefone.textContent = valido ? '' : 'Telefone inválido ou DDD inexistente.';
  return valido;
}



function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length <= 2) return `(${telefone}`;
  if (telefone.length <= 6) return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  if (telefone.length <= 10) return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
}

function atualizarTelefone(event) {
  const input = event.target;
  input.value = formatarTelefone(input.value);
}

// Validação de e-mail
function validarEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim().toLowerCase();

  // Regex básica para e-mail
  const regex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

  // Domínios aceitáveis (adapte à sua necessidade)
  const dominiosAceitos = ['.com', '.com.br', '.org', '.net', '.edu.br'];
  const dominioValido = dominiosAceitos.some(d => email.endsWith(d));
  const valido = regex.test(email) && dominioValido;

  emailInput.classList.toggle('error', !valido);
  labelEmail.textContent = valido ? '' : 'E-mail inválido ou com domínio não aceito.';
  return valido;
}



// CEP – Máscara e busca via API
function formatarCEP(input) {
  let cep = input.value.replace(/\D/g, '');
  if (cep.length > 5) cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
  input.value = cep;
}

function buscarCEP() {
  let cep = document.getElementById('cep').value;
  if (!cep) {
    alert('Por favor, informe um CEP válido.');
    return;
  }
  cep = cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar CEP");
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        document.getElementById('endereco').value = 'CEP não encontrado';
        document.getElementById('bairro').value = 'CEP não encontrado';
        return;
      }

      document.getElementById('endereco').value = data.logradouro || 'Endereço não encontrado';
      document.getElementById('bairro').value = data.bairro || 'Endereço não encontrado';
    })
    .catch(error => {
      document.getElementById('endereco').value = '';
      document.getElementById('bairro').value = '';
      console.error("Erro na consulta do CEP:", error);
    });
}

// Cadastro final
function cadastrar() {
  console.log('Função cadastrar foi chamada');

  const cpfValido = validarCPFInput();
  const emailValido = validarEmail();
  const telefoneValido = validarTelefone();

  console.log("EMAIL:", emailValido);
  console.log("TELEFONE:", telefoneValido);

  if (
    validNome &&
    validUsuario &&
    validSenha &&
    validConfirmSenha &&
    validPin &&
    cpfValido &&
    emailValido &&
    telefoneValido
  ) {
    console.log('Todos os campos são válidos');

    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value,
      pinCad: pin.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.style.display = 'none';

    setTimeout(() => {
      window.location.href = '/paginas/login.html';
    }, 3000);
  } else {
    console.log('Algum campo inválido');
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.style.display = 'none';
  }
}
