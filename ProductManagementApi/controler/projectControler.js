// Import contact model
Project = require('../model/projectModel');

// Handle index actions
exports.index = function (req, res) {
    Project.get(function (err, projectList) {
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
                message: "Project successfully",
                data: projectList
            });
    });
};

// Handle create Project actions
exports.create = function (req, res) {
    Project.findOne({ title: req.body.newProject.title }, function (err, project) {
        console.log('Project:', project);
        console.log('taskTitle:', req.body.newProject.title);
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
                if (project != null) {
                    res.json({
                        status: 'failed',
                        success: false,
                        message: 'Project already exists!',
                        err: err
                    });
                } else {
                    var newProject = new Project();
                    newProject.title = req.body.newProject.title;
                    newProject.description = req.body.newProject.description;
                    newProject.tasks = 0;
                    newProject.team = req.body.newProject.team;
                    newProject.progress = 10;
                    newProject.isCompleted = false;
                    newProject.isUpdated = false;
                    newProject.createdBy = req.body.newProject.createdBy;
                    newProject.startTime = req.body.newProject.startTime;
                    // save the Project and check for errors
                    newProject.save(function (err) {
                        if (err) {
                            res.json({
                                status: 'failed',
                                success: false,
                                message: 'New Project failed!' + err.message,
                                err: err
                            });
                            console.log(err.message)
                        }
                        else
                            res.json({
                                status: 'Success',
                                success: true,
                                message: 'New Project created!',
                                data: newProject
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


// Handle view Project info
exports.view = function (req, res) {
    Project.find({
        $or: [
            { createdBy: req.params.id },
            { "team.uid": req.params.id }
        ]
    }, function (err, projectList) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Project details Failed!',
                err: err
            });
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Project details loading..',
                data: projectList
            });
    });
};


// Handle update Project info
exports.update = function (req, res) {
    Project.findOne({ pId: req.params.id }, function (err, project) {
        if (err)
            res.json({
                status: 'failed',
                success: false,
                message: 'Update Project Failed!' + err.message,
                err: err
            });
        else {
            project.title = req.body.newProject.title;
            project.description = req.body.newProject.description;
            project.tasks = 0;
            project.team = req.body.newProject.team;
            project.progress = 10;
            project.isCompleted = false;
            project.isUpdated = false;
            project.createdBy = req.body.newProject.createdBy;
            project.startTime = req.body.newProject.startTime;
            // update the Project and check for errors
            project.save(function (err) {
                if (err)
                    res.json({
                        status: 'failed',
                        success: false,
                        message: 'Update Project Failed!' + err.message,
                        err: err
                    });
                else
                    res.json({
                        status: 'Success',
                        success: true,
                        message: 'New Project created!',
                        data: project
                    });
            });
        }

    });
};

// Handle delete Project
exports.delete = function (req, res) {
    Project.remove({
        pId: req.params.id
    }, function (err, project) {
        if (err)
            res.send(err);
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Project deleted!'
            });
    });
};
