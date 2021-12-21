var mongoose = require('mongoose');
// Setup schema
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var projectSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        auto: true,
    },
    createdBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime:{
        type: String,
        required: true  
    },
    status: {
        type: String,
        required: true,
        default: "ongoing"
    },
    tasks: {
        type: Number,
        required: true,
        default: 0
    },
    progress: {
        type: Number,
        required: true,
        default: 10
    },
    team: [{
        uid: {
            type:String
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        photo: {
            type: String
        }
    }],
    isCompleted: { type: Boolean, required: true, default: false },
    isUpdated: { type: Boolean },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Users = module.exports = mongoose.model('myprojects', projectSchema);
module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
}