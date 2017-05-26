var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
	text: {
		type: String,
		default: ''
	},
	time: {
		type: String,
		default: '',
	},
	 user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});