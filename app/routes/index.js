module.exports = function (application) {
  application.get("/", function (req, res) {
    // navega até o controller e executa a função
    application.app.controllers.index.login(application, req, res);
  });
};
