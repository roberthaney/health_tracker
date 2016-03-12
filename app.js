//(function($) {
var Foods = Backbone.Model.extend({
	initialize: function() {
		//set listener for model changes
		this.on('change', function() {
			console.log('Model values changed');
		});
	}
})

var AppView = Backbone.View.extend({
	el: $('#search'),
	initialize: function() {
		_.bindAll(this, 'render');
		this.render();
	},
	events: {
	},
	render: function() {
		$(this.el).append("<div id='heading'><h2>Health Tracker</h2></div>");
		$(this.el).append("<form><label>Enter a food item to search for: </label><input type='text' id='fooditem'></form>")
	}
});
var myFood = new Foods();
var appView = new AppView({model: myFood});
//})(jQuery);