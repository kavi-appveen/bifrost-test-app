module.exports = (app) => {
    const employees = require('../controllers/odp.controller.js');
    const message = require('../controllers/message.controller.js');

    // Create a new employee
    app.post('/employees', function(req, res) {
        employees.create(req, res)
    });

    // Retrieve all employees                                                                                                                                                             
    app.get('/employees', function(req, res) {
        employees.getEmployees(req, res)
    });

    // Enter a new message
    app.post('/message', function(req, res) {
        message.create(req, res)
    });
}