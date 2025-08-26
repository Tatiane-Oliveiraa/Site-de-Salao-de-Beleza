// Função para buscar o endereço automaticamente com base no CEP informado
function buscarCEP() {
    let cep = document.getElementById('cep').value;
    if (!cep) {
       alert('Por favor, informe um CEP válido.');
    return;
    }
    cep = cep.replace(/\D/g, ''); // Remove qualquer caractere que não seja número


    if (cep.length !== 8) {
        // Se o CEP não tiver 8 dígitos limpa os campos de endereço e bairro
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        return;
    }

    // Faz uma requisição para a API ViaCEP com o CEP fornecido
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar CEP");
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            if (data.erro) {
                // Se o CEP não for encontrado limpa os campos
                document.getElementById('endereco').value = 'CEP não encontrado';
                document.getElementById('bairro').value = 'CEP não encontrado';
                return;
            }

            // Preenche os campos com os dados retornados da API
            document.getElementById('endereco').value = data.logradouro || 'Endereço não encontrado';
            document.getElementById('bairro').value = data.bairro || 'Endereço não encontrado';
        })
        .catch(error => {
            // Em caso de erro na requisição limpa os campos e mostra erro no console
            document.getElementById('endereco').value = '';
            document.getElementById('bairro').value = '';
            console.error("Erro na consulta do CEP:", error);
        });
}

function formatarCEP(input) {
    let cep = input.value;

    // Remove tudo que não for número
    cep = cep.replace(/\D/g, '');

    // Aplica a máscara: 00000-000
    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    input.value = cep;
}


// Função para validar a senha inserida pelo usuário
function validarSenha() {
    const senha = document.getElementById("senha").value; // Pega o valor da senha
    const erroSenha = document.getElementById("erroSenha"); // Elemento onde o erro será mostrado
    const senhaField = document.getElementById("senha"); // O campo de senha em si

    // Expressão regular: pelo menos uma letra minúscula, pelo menos um número, e no mínimo 6 caracteres
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;

    // Se a senha não atender aos requisitos
    if (!regex.test(senha)) {
        erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres e conter letras minúsculas e números.";
        senhaField.style.borderColor = "red"; // Borda vermelha se inválido
        return false;
    } else {
        erroSenha.textContent = ""; // Limpa a mensagem de erro
        senhaField.style.borderColor = ""; // Limpa a borda quando válido
        return true;
    }
}




// Função para validar o formulário no envio
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio do formulário para realizar a validação

    const usuario = document.getElementById("usuario")?.value;
    const email = document.getElementById("email")?.value;
    const senha = document.getElementById("senha")?.value;
    const pin = document.getElementById("pin")?.value;

    // Inicializa uma variável para detectar se há algum erro
    let erro = false;

    // Verifica se todos os campos necessários estão preenchidos
    if (!usuario) {
        document.getElementById("erroUsuario").textContent = "Campo de usuário é obrigatório.";
        document.getElementById("usuario").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroUsuario").textContent = "";
        document.getElementById("usuario").style.borderColor = "";
    }

    if (!email) {
        document.getElementById("erroEmail").textContent = "Campo de e-mail é obrigatório.";
        document.getElementById("email").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroEmail").textContent = "";
        document.getElementById("email").style.borderColor = "";
    }

    if (!senha) {
        document.getElementById("erroSenha").textContent = "Campo de senha é obrigatório.";
        document.getElementById("senha").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroSenha").textContent = "";
        document.getElementById("senha").style.borderColor = "";
    }

    if (!pin) {
        document.getElementById("erroPin").textContent = "Campo de PIN é obrigatório.";
        document.getElementById("pin").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroPin").textContent = "";
        document.getElementById("pin").style.borderColor = "";
    }

    // Validação do CPF, telefone, e-mail e senhas
    let senhaValida = validarSenha();
    let confirmacaoSenhaValida = validarConfirmacaoSenha();
    let cpfValido = validarCPFInput(); 
    let telefoneValido = validarTelefone(); 
    let emailValido = validarEmail(); 

    // Feedback visual para campos inválidos
    if (!senhaValida) {
        document.getElementById("erroSenha").textContent = "A senha não atende aos requisitos.";
        document.getElementById("senha").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroSenha").textContent = "";
        document.getElementById("senha").style.borderColor = "";
    }

    if (!confirmacaoSenhaValida) {
        document.getElementById("erroConfirmacao").textContent = "As senhas não coincidem.";
        document.getElementById("confirmarSenha").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroConfirmacao").textContent = "";
        document.getElementById("confirmarSenha").style.borderColor = "";
    }

    if (!cpfValido) {
        document.getElementById("erroCpf").textContent = "CPF inválido.";
        document.getElementById("cpf").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroCpf").textContent = "";
        document.getElementById("cpf").style.borderColor = "";
    }

    if (!telefoneValido) {
        document.getElementById("erroTelefone").textContent = "Telefone inválido.";
        document.getElementById("celular").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroTelefone").textContent = "";
        document.getElementById("celular").style.borderColor = "";
    }

    if (!emailValido) {
        document.getElementById("erroEmail").textContent = "E-mail inválido.";
        document.getElementById("email").style.borderColor = "red";
        erro = true;
    } else {
        document.getElementById("erroEmail").textContent = "";
        document.getElementById("email").style.borderColor = "";
    }

    // Se houver erros, exibe o alerta e impede o envio
    if (erro) {
        alert("Por favor, corrija os erros antes de enviar o formulário.");
        return false; // Impede o envio
    }

    // Se tudo estiver válido, armazena dados no localStorage
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);
    localStorage.setItem("pin", pin);

    // Se tudo estiver válido, redireciona para a página de login
    window.location.href = "../paginas/login.html"; 
}



// Função que compara a senha e a confirmação de senha
function validarConfirmacaoSenha() {
    const senha = document.getElementById("senha").value; // Senha digitada
    const confirmar = document.getElementById("confirmarSenha").value; // Confirmação da senha
    const erroConfirmacao = document.getElementById("erroConfirmacao");

    if (confirmar && senha !== confirmar) {
        erroConfirmacao.textContent = "As senhas não coincidem.";
        return false;
    } else {
        erroConfirmacao.textContent = "";
        return true;
    }
}

// Função para formatar o CPF no padrão 000.000.000-00
function validarCPF(cpf) {
    if (!cpf) return false;  // Verifica se o CPF está vazio

    cpf = cpf.replace(/\D/g, ''); // Remove qualquer caracter não numérico

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF com números repetidos não é válido
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false; // O primeiro dígito verificador não é válido
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false; // O segundo dígito verificador não é válido
    }

    return true; // CPF válido
}


function validarCPFInput() {
    const cpf = document.getElementById('cpf').value;

    if (!validarCPF(cpf)) {
        alert('Por favor, insira um CPF válido!');
        return false;
    }
    return true;
}


function validarTelefone() {
    const telefone = document.getElementById("celular").value;
    const erroTelefone = document.getElementById("erroTelefone"); // Elemento onde o erro será mostrado
    const telefoneField = document.getElementById("celular"); // O campo de telefone em si

    // Expressão regular para validar os três formatos
    const regexTelefone = /^(?:\(\d{2}\)\s|\d{2}\s)?\d{5}-?\d{4}$/;

    // Se o telefone não corresponder ao formato, exibe a mensagem de erro
    if (!regexTelefone.test(telefone)) {
        erroTelefone.textContent = "O telefone deve estar no formato (XX) XXXXX-XXXX ou XXXXXXXXXXX";
        telefoneField.style.borderColor = "red"; // Borda vermelha se inválido
        return false;
    } else {
        erroTelefone.textContent = ""; // Limpa a mensagem de erro
        telefoneField.style.borderColor = ""; // Limpa a borda quando válido
        return true;
    }
}

function formatarTelefone(telefone) {
    // Remove todos os caracteres que não são números
    telefone = telefone.replace(/\D/g, "");

    // Verifica o comprimento e aplica a formatação
    if (telefone.length <= 2) {
        return `(${telefone}`;
    } else if (telefone.length <= 6) {
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else if (telefone.length <= 10) {
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    } else {
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
    }
}

function atualizarTelefone(event) {
    const telefoneInput = document.getElementById("celular");
    telefoneInput.value = formatarTelefone(telefoneInput.value);
}


function validarEmail() {
    const email = document.getElementById("email").value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Validação de e-mail simples

    if (!regexEmail.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }
    return true;
}

function formatarCPF(input) {
    let cpf = input.value;

    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    if (cpf.length > 3 && cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, '$1.$2.$3-$4');
    }

    input.value = cpf;
}

function cadastrarUsuario() {
  const nomeCad = document.querySelector('#nome').value;
  const userCad = document.querySelector('#usuario').value;
  const senhaCad = document.querySelector('#senha').value;
  const pinCad = document.querySelector('#pin').value;

  // Pega lista atual do localStorage ou cria uma vazia
  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  // Cria objeto novo usuário
  const novoUser = {
    nomeCad,
    userCad,
    senhaCad,
    pinCad
  };

  // Adiciona novo usuário na lista
  listaUser.push(novoUser);

  // Salva novamente no localStorage
  localStorage.setItem('listaUser', JSON.stringify(listaUser));

  alert('Usuário cadastrado com sucesso!');
  // Redireciona, limpa formulário, etc.
}
