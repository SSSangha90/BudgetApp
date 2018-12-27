//Controllers wrapped around their own IIFEs

// Budget controller
var budgetController = (function(){
	//function consructor
	//starts with capital letter
	var Expense = function(id, description, value){
		//this key word for each argument we pass through the parameters
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var Income = function(id, description, value){
	this.id = id;
	this.description = description;
	this.value = value;
	};

	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp:0,
			inc:0
		}
	};
	
	return {
		addItem: function(type, des, val){
			var newItem, ID;
			
			//for when the array is empty
			if (data.allItems[type].length > 0) {
				
			// ID = last ID in the array + 1
			// Create new ID
			ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}
			else{
				ID = 0;
			}
			
			// Create new item based on inc or exp type
			if (type === "exp"){
			newItem = new Expense(ID, des, val);
			} else if (type === "inc"){
			newItem = new Income(ID, des, val);
			}

			//Then push it into our datastructure
			data.allItems[type].push(newItem);
			// type is exp or inc
			//push to add item to the end of the array
			
			//Return the new element
			return newItem;
		},
		
		testing: function(){
			console.log(data);
		}
	};
	
})();


//UI Controller
var UIController = (function(){
//Creating an object to store all the strings, html classes
	var DOMStrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expensesContainer: ".expenses__list",
	};
	
	return {
		getinput: function(){
			//how we define properties
			return {
			type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
			description: document.querySelector(DOMStrings.inputDescription).value,
			value: document.querySelector(DOMStrings.inputValue).value
			};
		},
		
		addListItem: function(obj, type){
			var html, newHtml, element;
			// Create HTML String with placeholder text
			
			// % used as a placeholder
			if (type === "inc"){
			element = DOMStrings.incomeContainer;
			html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if (type === "exp"){
			element = DOMStrings.expensesContainer;
			html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			
			// Replace the placeholder text with some actual data
			newHtml = html.replace("%id%", obj.id);
			newHtml = newHtml.replace("%description%", obj.description);
			newHtml = newHtml.replace("%value%", obj.value);
			
			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			
		},
		
		clearFields: function(){
			var fields;
			var fieldsArr;
			
			fields = document.querySelectorAll(DOMStrings.inputDescription + ", " + DOMStrings.inputValue);
			
			fieldsArr = Array.prototype.slice.call(fields);
			
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			});
			
			fieldsArr[0].focus();
			
		},
		
		getDOMStrings: function(){
			return DOMStrings;
			//exposing the DOMStrings object into public
		}
	};
	
})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl){
	var setUpEventListeners = function(){
		
	var DOM = UICtrl.getDOMStrings();
	document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
	
	// 6. Make all this available on the key press event, the return key specifically.
	//Use the MDN Event reference online
	
	document.addEventListener("keypress", function(event){
		//some developers use e as the parameter
		if (event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});
};
	
	
	var ctrlAddItem = function(){
		var input, newItem;
		// 1. Get the field input data
		input = UICtrl.getinput();
		console.log(input);
		
		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		// 3. Add the item to the UI
		UICtrl.addListItem(newItem, input.type);
		
		// 4. Clear the fields
		UICtrl.clearFields();
		
		// 5. Calculate the budget
		
		// 6. Display the budget on the UI
		
	};
	
	return {
		init: function(){
			console.log("Application has started.");
			setUpEventListeners();
		}
	};
	
})(budgetController, UIController);

controller.init();





