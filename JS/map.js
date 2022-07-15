let myMap;

const init = () => {
	myMap = new ymaps.Map("map", {
		center: [55.75, 37.57],
		zoom: 13,
		controls: []
	});

	const coords = [
		[55.754303, 37.621375],
		[55.762528, 37.616033],
		[55.765083, 37.615106],
		[55.771234, 37.632345],
		[55.752004, 37.576133],
	];

	const myCollection = new ymaps.GeoObjectCollection({}, {
		draggable: false,
		iconLayout: 'default#image',
		iconImageHref: './images/marker.png',
		iconImageSize: [46, 57],
		iconImageOffset: [-35, -52]
		});

		coords.forEach(coord => {
		myCollection.add(new ymaps.Placemark(coord));
		})
		
		myMap.geoObjects.add(myCollection);

		myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);