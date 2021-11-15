var socket = io("http://localhost:8080");

/* 
    escuta o servidor
    o cliente executa função de callback
    o servidor pode enviar qualquer coisa: função, json, texto etc.
*/
socket.on("msgParaCliente", function (data) {
  // coloca uma mensagem lá na view de que o usuário entrou no chat
  var html = "";
  html += `<div class="dialogo">
            <h4>${data.apelido}</h4>
            <p>${data.mensagem}</p>
          </div>`;
  // coloca a mensagem lá na div
  $("#dialogos").append(html);
  window.scrollTo(0, document.body.scrollHeight);
});

// envia a relação de participantes
socket.on("participantesParaCliente", function (data) {
  // coloca a relação de participantes lá na view
  var html = "";

  html += `<span class="participante">
            <img src="images/ico_usuario.png" />
            ${data.apelido}
          </span>`;
  // coloca esse sapn lá na div
  $("#pessoas").append(html);
});

// configura evento de clique do botão de enviar mensagem
$("#enviar_mensagem").click(function () {
  socket.emit("msgParaServidor", {
    apelido: $("#apelido").val(),
    mensagem: $("#mensagem").val(),
    apelido_atualiza_relacao: $("#apelido_atualiza_relacao").val(),
  });
  // troca o value do campo para evitar duplicação de participante
  $("#apelido_atualiza_relacao").val(1);
  // limpa o campo da mensagem enviada
  $("#mensagem").val("");
});
