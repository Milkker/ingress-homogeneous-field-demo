//ingess field methods
var IngressHomoFieldCalculator = function(){
	var _getMaxSeqnoWithHeight = function(h){
		return h * (h + 1) / 2;
	};

	return {	
		getMaxSeqno: function(level){
			return _getMaxSeqnoWithHeight(level - 2) + level 
		},
		getSeqByPathType: function(level, beginLevel, endLevel){
			var h = level - beginLevel + 1;
			var maxNumInPreviousRow = h * (h - 1)/2;

			return endLevel - beginLevel + maxNumInPreviousRow + 1 - h + (h == level ? 1 : 0);
		},
		getPathBySeq: function(level, seq){
			var maxSeqno = _getMaxSeqnoWithHeight(level - 1) + 1;
			var maxSeqnoInTwoFloor = _getMaxSeqnoWithHeight(level - 2);
			var isBottom = maxSeqno == 1 || seq > maxSeqnoInTwoFloor;
			var result = {
				beginLevel: 0,
				endLevel: 0,
			};

			if(isBottom){
				result.beginLevel = 1;
				result.endLevel = seq - maxSeqnoInTwoFloor;
			}
			else{
				var h = Math.ceil((Math.pow(8*seq + 1, 0.5) - 1) / 2);
				var lastRowMaxSeq = _getMaxSeqnoWithHeight(h - 1);
				var offset = level - h;

				result.beginLevel = level - h,
				result.endLevel = seq - lastRowMaxSeq + offset;
			}

			return result;
		}
	}
};