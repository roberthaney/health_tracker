var app = {};

app.Foods = Backbone.Model.extend({
	initialize: function() {
		console.log("Model initialized");
		//set listener for model changes
		this.on('change', function() {
			console.log('Model values changed');
		});
	}, 
	defaults: {
		name: '',
		calories: 0
	}
});

app.AppView = Backbone.View.extend({
	el: $('#results'),
	initialize: function() {
		console.log("View initialized");
		_.bindAll(this, 'render');
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},
	events: {
		'keypress #fooditem': 'updateOnEnter'
	},
	render: function() {
		$(this.el).html("<div class='food-result'><strong>Food item:</strong> " + this.model.get('name') + "</div>");
		$(this.el).append("<div class='food-result'><strong>Calories:</strong> " + this.model.get('calories') + "</div>");
	},
	updateOnEnter: function(e) {
		if (e.which === 13) {
			var value = $('#fooditem').val().trim();
			this.model.set("name", value);
		}
	}
});

var myFood = new app.Foods({name: 'cake', calories: 500});
var appView = new app.AppView({model: myFood});
//check attributes of Foods instance
console.log(myFood.attributes);
//change attributes test
myFood.set('name', 'cookie');
console.log(myFood.attributes);


