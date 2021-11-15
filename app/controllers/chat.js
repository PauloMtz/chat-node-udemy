const { emit } = require("../../config/app");

module.exports.load = function (application, request, response) {
  // recebe os dados do formulário
  // o body-parser popula essas informações
  var data_form = request.body;

  // verifica se está recebendo corretamente
  //console.log(data_form);

  // faz as validações
  request
    .assert("apelido", "Informe um nome ou apelido para entrar no chat")
    .notEmpty();
  request
    .assert("apelido", "O nome ou apelido deve ter entre 3 e 15 caracteres")
    .len(3, 15);

  // capta os erros e joga numa variável
  var erros = request.validationErrors();

  if (erros) {
    response.render("index", { validacao: erros });
    return; // finaliza o processo
  }

  /* 
    envia mensagem para o cliente
    o cliente executa função de callback
    o servidor pode enviar qualquer coisa: função, json, texto etc.
    além disso, a instância da classe (application) irá pegar
    aquela variável global 'io_var_g definida lá no lado servidor
    no arquivo index na raiz da aplicação
*/
  application.get("io_var_g").emit("msgParaCliente", {
    apelido: data_form.apelido,
    mensagem: " acabou de entrar no chat",
  });

  // renderiza página, enviando os dados recebidos do formulário
  response.render("chat", { data_form: data_form });
};
