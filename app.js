var app = {};
var totalCalories = 0;

    app.FoodItem = Backbone.Model.extend({
      defaults: {
        title: '',
        calories: 0
      }
    });
    
    app.FoodList = Backbone.Collection.extend({
      model: app.FoodItem,
      localStorage: new Store("backbone-food")
    });

    app.FoodItemView = Backbone.View.extend({
      tagname: 'li',
      template: _.template($('#item-template').html()),
      initialize: function() {
        //remove destroyed model from collection
        this.model.on('destroy', this.remove, this);
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this; 
      }, 
      events: {
        //listener for remove and total buttons
        'click .destroy': 'destroy',
        'click .total': 'addToTotal'
      }, 
      destroy: function() {
        //issue command to remove model linked to view
        this.model.destroy();
      },
      addToTotal: function() {
        totalCalories += this.model.get('calories');
        app.appView.render();
      }
    });

    app.AppView = Backbone.View.extend({
      el: '#healthapp',
      initialize: function() {
        this.input = this.$('#fooditem');
        app.FoodList.on('add', this.addOne, this); //render with addOne when new elements added to collection
        app.FoodList.fetch(); //load list from local storage
      },
      events: {
        'keypress #fooditem': 'updateOnEnter'
      },
      updateOnEnter: function(e) {
        //check if keypress not enter or input is blank
        if (e.which !== 13 || !this.input.val().trim()) {
          return;
        }
        //otherwise create new instance of a model within the collection
        app.FoodList.create(this.newAttributes());
        this.input.val(''); //erase input field
      },
      addOne: function(fooditem) {
        //create individual model view for food item and append result of render to list
        var view = new app.FoodItemView({model: fooditem});
        $('#food-list').append(view.render().el);
      },
      //currently only returns value of input for food item along with arbitrary calories value
      newAttributes: function() {
        return {
          title: this.input.val().trim(),
          calories: 10
        }
      },
      render: function() {
        var calorieString = '<p>' +  totalCalories + '</p>';
        $('#calorie-intake').html(calorieString);
      }
    });

  //instantiate
  app.FoodList = new app.FoodList();
  app.appView = new app.AppView();

