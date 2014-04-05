var FizzBuzz = {
		create: function() {
		    return Object.create(this);
		},
		getAsList: function(input){
			var result = [];
			for(var i in input){
				result.push(this.get(input[i]));
			};
			return result;
		},
		get: function (i) {
			if(i % 15 === 0)
				return "fizzbuzz";
			if(i % 3 === 0)
				return "fizz";
			if(i % 5 === 0)
				return "buzz";
			return i;
		}
		};
