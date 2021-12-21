// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import contact controller
var userController = require('./controler/usersControler');
// Contact routes
router.route('/users')
    .get(userController.index)
    .post(userController.signUp);
//.delete(userController.emptyCart);

router.route('/users/:id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/users/byEmail/:email')
    .post(userController.login);

// Import contact controller
var projectController = require('./controler/projectControler');
// Contact routes
router.route('/projects')
    .get(projectController.index)
    .post(projectController.create);

router.route('/projects/:id')
    .get(projectController.view)
    .patch(projectController.update)
    .put(projectController.update)
    .delete(projectController.delete);

// Import contact controller
var tasksControler = require('./controler/tasksControler');
// Contact routes
router.route('/tasks')
    .get(tasksControler.index)
    .post(tasksControler.create);

router.route('/tasks/:id')
    .get(tasksControler.view)
    .patch(tasksControler.update)
    .put(tasksControler.update)
    .delete(tasksControler.delete);


router.route('/tasks/byProject/:id')
    .get(tasksControler.viewByProject)


module.exports = router;