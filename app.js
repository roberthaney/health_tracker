//(function($) {
var Foods = Backbone.Model.extend({
	defaults: {
		name: '',
		calories: 0
	},
	initialize: function() {
		//set listener for model changes
		this.on('change', function() {
			console.log('Model values changed: ' + this.name + this.calories);
		});
	}
});

var AppView = Backbone.View.extend({
	el: $('#results'),
	initialize: function() {
		_.bindAll(this, 'render');
		this.listenTo(this.model, 'change', this.render);
	},
	events: {
		'keypress #fooditem': 'updateOnEnter'
	},
	render: function() {
		$(this.el).append("<div>" + this.model.name + "</div>");
	},
	updateOnEnter: function(e) {
		if (e.which === 13) {
			var value = $('#fooditem').val().trim();
			this.model.set("name", value);
		}
	}
});
var myFood = new Foods();
var appView = new AppView({model: myFood});
//})(jQuery);