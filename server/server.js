const express = require('express');
const next = require('next');

// Se configura servidor con nextjs
const dev = process.env.NODE_ENV !== 'production';
console.log(dev ? 'development' : 'production');

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();

		// API Rest
		server.use('/api/items', require('./api'));

		// Url consultadas por react
		server.get('/items', (req, res) => {
			const actualPage = '/search';
			const queryParams = { search: req.query.search };
			if (queryParams.search) {
				app.render(req, res, actualPage, queryParams);
			} else {
				res.redirect('/');
			}
		});

		server.get('/items/:id', (req, res) => {
			const actualPage = '/item';
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});

		server.get('*', (req, res) => handle(req, res));

		server.listen(3000, err => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	}).catch(err => {
		console.log(err.stack);
		process.exit(1);
	});