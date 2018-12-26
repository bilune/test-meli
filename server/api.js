const express = require('express');
const router = express.Router();
const axios = require('axios');

const { formatSearch, formatItem, formatCategory } = require('./format');

/** 
 * /api/items?q=:search
 * Consulta la api de Meli con el query solicitado.
 */
router.get('/', (req, res) => {
	const query = req.query.q;
	if (!query) return res.status(404).json({ error: 'No params were sent.'})
	const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`;

	axios.get(url).then(response => {
		res.json(formatSearch(response.data));
	}).catch(error => {
		res.status(500).send(error);
	});
});

/**
 * /api/items/:id
 * Consulta un artículo en la API de Meli
 */
router.get('/:id', (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(404).json({ error: 'No id was sent. '});
	const generalUrl = `https://api.mercadolibre.com/items/${id}`;
	const descriptionUrl = `https://api.mercadolibre.com/items/${id}/description`;
	
	axios.all([
		axios.get(generalUrl).catch(() => null),
		axios.get(descriptionUrl).catch(() => null)
	]).then(axios.spread((generalRes, descriptionRes) => {
		if (generalRes) {
			return axios.all([
				generalRes,
				descriptionRes,
				axios.get(`https://api.mercadolibre.com/categories/${generalRes.data.category_id}`),
			]);
		} else {
			res.status(404).end();
		}
	})).then(axios.spread((generalRes, descriptionRes, categoryRes) => {
		res.json(formatItem(
			generalRes.data,
			descriptionRes && descriptionRes.data,
			categoryRes && categoryRes.data,
		));
	})).catch(error => {
		res.status(404).end({ error });
	});
});

/**
 * /api/items/categories/:id
 * Consulta una categoria en la API de Meli
 */
router.get('/categories/:id', (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(404).json({ error: 'No id was sent. '});
	const url = `https://api.mercadolibre.com/categories/${id}`;

	axios.get(url).then(response => {
		res.json(formatCategory(response.data));
	}).catch(error => {
		res.status(404).json({ error });
	})
})

module.exports = router;