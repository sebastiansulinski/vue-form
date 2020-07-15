const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
router.render = (req, res) => {
  if (req.method === 'POST') {
    res.status(422).jsonp({
      message: 'Something went wrong',
      errors: {
        title: 'Please select the title',
        name: 'Please provide your name',
      },
    });
  }
};

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
