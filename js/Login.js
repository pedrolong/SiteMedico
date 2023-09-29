// Definir usuários válidos em um objeto JSON
const usuariosValidos = {
    "usuario1": {
      "cpf": "477.543.498-50",
      "senha": "senha123"
    },
    "usuario2": {
      "cpf": "222.222.222-22",
      "senha": "senha456"
    },
    "usuario3": {
      "cpf": "333.333.333-33",
      "senha": "senha789"
    }
  };
  
  // Função de validação de login
  function validarLogin() {
    // Obter os valores de entrada do CPF e da senha
    const cpf = document.querySelector('.cpf').value;
    const senha = document.querySelector('.senha').value;
  
    // Verificar se o CPF e a senha correspondem a um usuário válido
    for (let usuario in usuariosValidos) {
      if (usuariosValidos[usuario].cpf === cpf && usuariosValidos[usuario].senha === senha) {
        alert("Login válido para o usuário " + usuario);
        return true; // login válido
      }
    }
  
    alert("CPF ou senha inválido"); // login inválido
    return false;
  }
  