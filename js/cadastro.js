function validarFormulario(event) {
    // Evita o envio do formulário
    event.preventDefault();
    
    // Variável que indica se o formulário é válido
    let formValido = true;
    
    // Verifica o campo "Nome"
    const nome = document.getElementById("nome").value;
    if (nome.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo Nome.");
    }
    
    // Verifica o campo "Email"
    const email = document.getElementById("email").value;
    if (email.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo Email.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formValido = false;
      alert("Por favor, preencha um Email válido.");
    }
    
    // Verifica o campo "Cidade"
    const cidade = document.getElementById("cidade").value;
    if (cidade.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo Cidade.");
    }
    
    // Verifica o campo "CPF"
    const cpf = document.getElementById("cpf").value;
    if (cpf.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo CPF.");
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      formValido = false;
      alert("Por favor, preencha um CPF válido (xxx.xxx.xxx-xx).");
    }
    
    // Verifica o campo "Senha"
    const senha = document.getElementById("senha").value;
    if (senha.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo Senha.");
    } else if (senha.length < 8) {
      formValido = false;
      alert("Por favor, preencha uma senha com pelo menos 8 caracteres.");
    }
    
    // Verifica o campo "Confirme a senha"
    const confirmeSenha = document.getElementById("confirme-senha").value;
    if (confirmeSenha.trim() === "") {
      formValido = false;
      alert("Por favor, preencha o campo Confirme a senha.");
    } else if (confirmeSenha !== senha) {
      formValido = false;
      alert("As senhas não coincidem.");
    }
    
    if (formValido) {
        alert("Login bem-sucedido!");
        location.replace("Tela de Login.html");
      }
    
  
  
  // Adiciona o evento de submit ao formulário
  const formulario = document.getElementById("cadastro-form");
  formulario.addEventListener("submit", validarFormulario);
}