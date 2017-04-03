Vue.component('my-circle', {
	props: {
		circle: {
			type: Object,
			default: function() {
				return {
					level: 0,
					x: 0,
					y: 0
				};
			}
		}
	},
	template: '<circle :cx="circle.x" :cy="circle.y"/>'
});

Vue.component('my-path', {
	computed: {
		d: function() {
			var path = this.path;
			var angle = Math.atan((path.end.y - path.begin.y) / (path.end.x - path.begin.x));
			var points = [];
			var r = (1 / Math.pow(path.level + 1, 0.5)) * 3;
			var x_offset = Math.sin(angle) * r / 2;
			var y_offset = Math.cos(angle) * r / 2;

			points.push({
				x: path.begin.x + x_offset,
				y: path.begin.y - y_offset
			});

			points.push({
				x: path.end.x + x_offset,
				y: path.end.y - y_offset
			});

			points.push({
				x: path.end.x - x_offset,
				y: path.end.y + y_offset
			});

			points.push({
				x: path.begin.x - x_offset,
				y: path.begin.y + y_offset
			});

			var result = "";

			for (var idx in points)
				result += (idx === '0' ? 'M' : 'L') + points[idx].x + ' ' + points[idx].y + ' ';

			return result + ' Z';
		},
	},
	props: {
		path: {
			type: Object,
			default: function() {
				return {
					level: 0,
					beginLevel: 0,
					endLevel: 0,
					begin: {
						level: 0,
						x: 0,
						y: 0
					},
					end: {
						level: 0,
						x: 1,
						y: 1
					}
				};
			}
		},
	},
	template: '<path :d="d" @click="click"/>',
	methods: {
		click: function() {
			this.$emit('click');
		}
	}
});

Vue.component('my-polygon', {
	computed: {
		points: function() {
			var polygon = this.polygon;
			var points = "";

			for (var idx in polygon)
				points += polygon[idx].x + "," + polygon[idx].y + " ";

			return points;
		},
	},
	props: {
		polygon: {
			type: Array,
			default: function() {
				return [];
			}
		},
	},
	template: '<polygon :points="points" />'
});