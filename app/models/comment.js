var mongoose=require('mongoose');
module.exports = mongoose.model('Comment', {
	comment: {
		type: String,
		default: ''
	},
	created_at: {type: Date, default: Date.now}
});