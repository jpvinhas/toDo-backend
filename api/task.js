const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        // const date = req.query.date ? req.query.date
        //     : moment().endOf('day').toDate()

        app.db('tasks')
            //.where({ userId: req.user.id })
            //.where('estimatedAt', '<=', date)
            .orderBy('id')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.title.trim()) {
            return res.status(400).send('Titulo é um campo obrigatório')
        }

        const task = {
            title: req.body.title,
            done: false,
        };

        app.db('tasks')
            .insert(task)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
    
    const edit = (req, res) => {
        if (!req.body.title.trim()) {
            return res.status(400).send('Titulo é um campo obrigatório')
        }
        app.db('tasks')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, done) => {
        app.db('tasks')
            .where({ id: req.params.id })
            .update({ done })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err));
    };
    
    const toggleTask = (req, res) => {
        const taskId = req.params.id; 
    
        app.db('tasks')
            .where({ id: taskId }) 
            .first()
            .then(task => {
                if (!task) {
                    return res.status(404).send(`Task com id ${taskId} não encontrada.`); 
                }
    
                const done = !task.done; 
                updateTaskDoneAt(req, res, done);
            })
            .catch(err => res.status(400).json(err));
    };
    
    

    return { getTasks, save, edit, remove, toggleTask }
}