import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as assert from 'assert';
import * as fallback from 'express-history-api-fallback';

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

interface HotelSearch {
	id: number;
	number: number;
	name: string;
	city: string;
}

interface Hotel {
	id: number;
	number: number;
	name: string;
	categories: number[];
	city: string;
	contactPerson: string;
	phone: string;
	alternativeHotels: number[];
	alternative: boolean;
}

interface Id {
	id: number;
}

interface Category {
	id: number;
	name: string;
}

let hotels = [
	{
		id: 123,
		number: 123,
		name: 'Hotel',
		categories: [1,2],
		city: 'Neuss',
		contactPerson: 'Herr Person',
		phone: '123456',
		alternativeHotels: [124, 150],
		alternative: true
	},
	{
		id: 124,
		number: 123,
		name: 'Hotel',
		categories: [1,2],
		city: 'Neuss',
		contactPerson: 'Herr Person',
		phone: '123456',
		alternativeHotels: [150],
		alternative: true
	},
	{
		id: 150,
		number: 123,
		name: 'Hotel',
		categories: [1,2],
		city: 'Neuss',
		contactPerson: 'Herr Person',
		phone: '123456',
		alternativeHotels: [],
		alternative: true
	}
];

let categories = [
	'Category1',
	'Category2'
]

const PORT = 8000;

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT);
});

app.get('/hotelapp/webapi/hotels', (req, res) => {
	console.log('GET /hotelapp/webapi/hotels');
	if (req.query.id) {
		let id: number = parseInt(req.query.id);
		let alternative: boolean = req.query.alternative;
		let result = [];
		let hotel: Hotel = hotels.filter((el) => el.id === id)[0];
		result.push({id: hotel.id, number: hotel.number, name: hotel.name, city: hotel.city});
		hotels.forEach((el) => {
			if (hotel.alternativeHotels.indexOf(el.id) > -1) {
				result.push({id: el.id, number: el.number, name: el.name, city: el.city});
			}
		});
		res.send(result);
	} else {
		let results = [];
		hotels.forEach((el) => {
			results.push({id: el.id, number: el.number, name: el.name, city: el.city});
		});
		res.send(results);
	}
});

app.get('/hotelapp/webapi/hotels/:id', (req, res) => {
	console.log('GET /hotelapp/webapi/hotels/' + parseInt(req.params.id));
	let id: number = parseInt(req.params.id);
	let filteredHotels = hotels.filter((el) => el.id === id);
	if (filteredHotels.length === 1) {
		let hotel: Hotel = filteredHotels[0];
		let result = {id: hotel.id, number: hotel.number, name: hotel.name, city: hotel.city};
		res.send(result);
	}
});

app.post('/hotelapp/webapi/hotels/', (req, res) => {
	console.log('POST /hotelapp/webapi/hotels');
	let body = req.body;
	let id = 0;
	hotels.forEach((el) => {
		if (el.id >= id) {
			id = el.id + 1;
		}
	});
	body.id = id;
	body.alternativeHotels = JSON.parse(req.body.alternativeHotels);
	hotels.push(body);
	res.send({id});
});

app.put('/hotelapp/webapi/hotels/:id', (req, res) => {
	console.log('PUT /hotelapp/webapi/hotels/' + parseInt(req.params.id));
	let index;
	let id = parseInt(req.params.id);
	hotels.forEach((el, idx) => {
		if (el.id === id) {
			index = idx;
		}
	});
	if (req.body.number !== undefined) {
		hotels[index].number = req.body.number;
	}
	if (req.body.name !== undefined) {
		hotels[index].name = req.body.name;
	}
	if (req.body.categories !== undefined) {
		hotels[index].categories = req.body.categories;
	}
	if (req.body.city !== undefined) {
		hotels[index].city = req.body.city;
	}
	if (req.body.contactPerson !== undefined) {
		hotels[index].contactPerson = req.body.contactPerson;
	}
	if (req.body.phone !== undefined) {
		hotels[index].phone = req.body.phone;
	}
	if (req.body.alternativeHotels !== undefined) {
		hotels[index].alternativeHotels = JSON.parse(req.body.alternativeHotels);
	}
	if (req.body.alternative !== undefined) {
		hotels[index].alternative = req.body.alternativ;
	}
	res.send(true);
});

app.delete('/hotelapp/webapi/hotels/:id', (req, res) => {
	console.log('DELETE /hotelapp/webapi/hotels/' + parseInt(req.params.id));
	let index;
	let id = parseInt(req.params.id);
	hotels.forEach((el, idx) => {
		if (el.id === id) {
			index = idx;
		}
	});
	hotels.splice(index, 1);
	res.send(true);
});

app.get('/hotelapp/webapi/categories', (req, res) => {
	console.log('GET /hotelapp/webapi/categories');
	res.send(categories);
});

app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(fallback(path.join(__dirname, '..', 'client', 'dist', 'index.html')));
