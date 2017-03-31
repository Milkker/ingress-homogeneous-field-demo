var ingressHomoFieldCalculatorTest = function()
{
	var testCases = [];
	var _genericTestCase = function(level)
	{
		var result = [];

		if(level == 1){
			result.push({
				level:1,
				seq:1,
				beginLevel:1,
				endLevel:1
			});
		}
		else{
			var seq = 1;
			for (var beginLevel = level - 1; beginLevel >= 1; beginLevel--) {
				for (var endLevel = beginLevel + (beginLevel > 1 ? 1 : 0); endLevel <= level; endLevel++) {
					result.push({
						level:level,
						seq:seq++,
						beginLevel:beginLevel,
						endLevel:endLevel
					});
				};
			};
		}

		return result;
	}
	
	var _unitTest = function(testFuncion, testCase){
		var result = testFuncion(testCase.level, testCase.seq);

		testCase.success = result.beginLevel == testCase.beginLevel && result.endLevel == testCase.endLevel;

		return testCase;
	}

	return {
		genericDefaultTestCases: function(){
			Array.prototype.push.apply(testCases, _genericTestCase(1));
			Array.prototype.push.apply(testCases, _genericTestCase(2));
			Array.prototype.push.apply(testCases, _genericTestCase(3));
			Array.prototype.push.apply(testCases, _genericTestCase(4));
			Array.prototype.push.apply(testCases, _genericTestCase(5));
			Array.prototype.push.apply(testCases, _genericTestCase(6));
		},
		genericTestCase:function(level){
			var result =  _genericTestCase(level);
			Array.prototype.push.apply(testCases, result);
			return result;
		},
		getTestCases:function(){
			return testCases;
		},
		unitTest: _unitTest,
		start:function(testFuncion){
			for(var idx in testCases)
				testCases[idx] = _unitTest(testFuncion, testCases[idx]);
		}
	}
}