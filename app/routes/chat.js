module.exports = function (application) {
  application.get("/chat", function (req, res) {
    // navega até o controller e executa a função
    application.app.controllers.chat.load(application, req, res);
  });

  application.post("/chat", function (req, res) {
    // navega até o controller e executa a função
    application.app.controllers.chat.load(application, req, res);
  });
};
