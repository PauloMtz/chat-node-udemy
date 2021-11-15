var app = require("./config/app");

var server = app.listen(8080, function () {
  console.log("Aplicação iniciada em http://localhost:8080");
});

// dessa forma, requisições na porta 8080 podem ser
// tanto por http quanto via websocket
var io = require("socket.io").listen(server);

// cria uma variável global
app.set("io_var_g", io);

// cria a conexão por websocket
io.on("connection", function (socket) {
  console.log("Usuário conectado");

  socket.on("disconnect", function () {
    console.log("O usuário foi desconectado");
  });

  socket.on("msgParaServidor", function (data) {
    // --- diálogos ---
    // envia apenas para o emissor
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    // envia para todos, exceto para o emissor
    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    // --- participantes ---
    // esse 'if' serve para evitar duplicação de participante quando envia mensagem
    if (parseInt(data.apelido_atualiza_relacao) == 0) {
      // envia apenas para o emissor
      socket.emit("participantesParaCliente", { apelido: data.apelido });

      // envia para todos, exceto para o emissor
      socket.broadcast.emit("participantesParaCliente", {
        apelido: data.apelido,
      });
    }
  });
});
