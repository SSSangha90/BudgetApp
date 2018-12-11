//Controllers wrapped around their own IIFEs

// Budget controller
var budgetController = (function(){
	
	//some code
	
})();


//UI Controller
var UIController = (function(){
//Creating an object to store all the strings, html classes
	var DOMStrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn"
	}
	
	return {
		getinput: function(){
			//how we define properties
			return {
			type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
			description: document.querySelector(DOMStrings.inputDescription).value,
			value: document.querySelector(DOMStrings.inputValue).value
			};
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
		
		// 1. Get the field input data
		var input = UICtrl.getinput();
		console.log(input);
		
		// 2. Add the item to the budget controller
		
		// 3. Add the item to the UI
		
		// 4. Calculate the budget
		
		// 5. Display the budget on the UI
		
	};
	
	return {
		init: function(){
			console.log("Application has started.");
			setUpEventListeners();
		}
	};
	
})(budgetController, UIController);

controller.init();





