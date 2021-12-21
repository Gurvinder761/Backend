// Import contact model
Task = require('../model/taskModel');

// Handle index actions
exports.index = function (req, res) {
    Task.get(function (err, projectList) {
        if (err) {
            res.json({
                status: "error",
                success: false,
                message: err,
            });
        } else
            res.json({
                status: "success",
                success: true,
                message: "Task successfully",
                data: projectList
            });
    });
};

// Handle create Task actions
exports.create = function (req, res) {
    Task.findOne({ title: req.body.newTask.title }, function (err, task) {
        console.log('Task:', task);
        console.log('taskTitle:', req.body.newTask.title);
        try {
            if (err) {
                console.log(err);
                res.json({
                    status: 'failed',
                    success: false,
                    message: 'Something went wrong!',
                    err: err
                });
            }
            else
                if (task != null) {
                    res.json({
                        status: 'failed',
                        success: false,
                        message: 'Task already exists!',
                        err: err
                    });
                } else {
                    console.log("req", req.body.newTask)
                    var newTask = new Task();
                    newTask.title = req.body.newTask.title;
                    newTask.projectId = req.body.newTask.projectId;
                    newTask.members = req.body.newTask.members;
                    newTask.progress = 10;
                    newTask.isCompleted = false;
                    newTask.isUpdated = false;
                    newTask.createdBy = req.body.newTask.createdBy;
                    newTask.startTime = req.body.newTask.startTime;
                    // save the Task and check for errors
                    newTask.save(function (err) {
                        if (err) {
                            res.json({
                                status: 'failed',
                                success: false,
                                message: 'New Task failed!' + err.message,
                                err: err
                            });
                            console.log(err.message)
                        }
                        else
                            res.json({
                                status: 'Success',
                                success: true,
                                message: 'New Task created!',
                                data: newTask
                            });
                    });
                }
        } catch (exception) {
            res.json({
                status: 'failed',
                success: false,
                message: 'Something went wrong! ' + exception.message,
                err: exception
            });
        }
    });

};
// Handle view Task info
exports.view = function (req, res) {
    Task.find({
        $or: [
            { createdBy: req.params.id },
            { "members.uid": req.params.id }
        ]
    }, function (err, projectList) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Task details Failed!',
                err: err
            });
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Task details loading..',
                data: projectList
            });
    });
};

// Handle view Task info
exports.viewByProject = function (req, res) {
    Task.find({ projectId: req.params.id }, function (err, projectList) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Task details Failed!',
                err: err
            });
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Task details loading..',
                data: projectList
            });
    });
};


// Handle update Task info
exports.update = function (req, res) {
    Task.findOne({ pId: req.params.id }, function (err, newTask) {
        if (err)
            res.json({
                status: 'failed',
                success: false,
                message: 'Update Task Failed!' + err.message,
                err: err
            });
        else {

            newTask.title = req.body.newTask.title;
            newTask.projectId = req.body.newTask.projectId;
            newTask.members = req.body.newTask.members;
            newTask.progress = 10;
            newTask.isCompleted = false;
            newTask.isUpdated = false;
            newTask.createdBy = req.body.newTask.createdBy;
            newTask.startTime = req.body.newTask.startTime;
            // update the Task and check for errors
            newTask.save(function (err) {
                if (err)
                    res.json({
                        status: 'failed',
                        success: false,
                        message: 'Update Task Failed!' + err.message,
                        err: err
                    });
                else
                    res.json({
                        status: 'Success',
                        success: true,
                        message: 'New Task created!',
                        data: newTask
                    });
            });
        }

    });
};

// Handle delete Task
exports.delete = function (req, res) {
    Task.remove({
        pId: req.params.id
    }, function (err, project) {
        if (err)
            res.send(err);
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Task deleted!'
            });
    });
};
