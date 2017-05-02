const app = require('../app');

const port = process.env.PORT || 3000;

console.log(`Port 1:: ${port}`);
app.set('port', port);

/**
 * Start App after sequelize sync.
 * @return {undefined}
 */
const server = app
  .listen(
    app.get('port'), () => {
      console.log(`Port 2:: ${server.address().port}`);
    });
