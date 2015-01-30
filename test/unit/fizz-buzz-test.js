FizzBuzzTest = TestCase("FizzBuzzTest");

FizzBuzzTest.prototype.setUp = function() {
	fizzBuzz = FizzBuzz.create();
};

FizzBuzzTest.prototype.test1MustBe1 = function() {
	assertEquals(1, fizzBuzz.get(1));
};

FizzBuzzTest.prototype.test2MustBe2 = function() {
	assertEquals(2, fizzBuzz.get(2));
};

FizzBuzzTest.prototype.test3MustBeFizz = function() {
	assertEquals("fizz", fizzBuzz.get(3));
};

FizzBuzzTest.prototype.test4MustBe4 = function() {
	assertEquals("4", fizzBuzz.get(4));
};

FizzBuzzTest.prototype.test5MustBeBuzz = function() {
	assertEquals("buzz", fizzBuzz.get(5)); 
};

FizzBuzzTest.prototype.testInputList = function() {
	var input = [];
	
	var i = 0;
	while(i++ < 15){
		input.push(i); 
	}
	
	assertEquals([1,2,"fizz",4,"buzz","fizz",7,8,"fizz","buzz",
	              11,"fizz",13,14,"fizzbuzz"], fizzBuzz.getAsList(input)); 
};
