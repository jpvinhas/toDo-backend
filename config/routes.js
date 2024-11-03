module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    //rotas publicas
    app.route('/public/tasks/:id/toggle')
        .put((req, res, next) => {
            console.log('Received request to toggle task:', req.params.id);
            next();
        }, app.api.task.toggleTask);

    app.route('/public/tasks')
        .get(app.api.task.getTasks)     
        .post(app.api.task.save);       

    app.route('/public/tasks/:id')
        .put(app.api.task.edit)         
        .delete(app.api.task.remove);

    //rotas privada
    app.route('/tasks')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)

    app.route('/tasks/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove)
        .put(app.api.task.edit)

    app.route('/tasks/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)
}