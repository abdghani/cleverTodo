var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var todosSchema = new Schema({
	userId: {
		type: String,
		required: true,
		ref: 'User'
	},
	content: {
		type: String,
		required: true
	},
	completed: {
		type: String,
		default: 0
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
	dueDate: {
		type: Date,
		required: true
	},
	completed_at: {
		type: Date,
		default: null
	}
})

module.exports = mongoose.model('todos', todosSchema)
