const author = {
	name: 'Gonzalo',
	apellido: 'Bilune',
};

/**
 * Recibe un item de la api de Meli
 * y la transforma a la estructura deseada.
 * @param {Object} item 
 */
const getItemInfo = item => {
	const amount = Math.floor(item.price);
	return {
		id: item.id,
		title: item.title,
		price: {
			currency: item.currency_id,
			amount,
			decimals: item.price - amount,
		},
		condition: item.condition,
		free_shipping: item.shipping.free_shipping,
	}

}

/**
 * Recibe la data de la API de búsqueda de Meli
 * y la transforma a la estructura deseada.
 * @param {Object} data 
 */
const formatSearch = data => {

	const categoryFilter = data.filters.find(filter => filter.id === 'category');
	const categoryValues = categoryFilter ? categoryFilter.values : [];
	const pathFromRoot = (categoryValues && categoryValues[0]) ? categoryValues[0].path_from_root : [];
	const categories = pathFromRoot.map(category => category.name);

	const items = data.results.map(item => {
		return {
			...getItemInfo(item),
			picture: item.thumbnail,
			location: item.address.state_name,	
		}
	});

	return { author, categories, items, };
}

/**
 * Recibe la data de la API de artículos de Meli
 * y la transforma a la estructura deseada
 * @param {Object} data data de API de artículos
 * @param {Object} description data de API de description
 * @param {Object} categoriesData data de API de categorías
 */
const formatItem = (data, description = {}, categories = {}) => {
	return {
		author,
		item: {
			...getItemInfo(data),
			picture: data.pictures.length ? data.pictures[0].url : data.thumbnail,
			sold_quantity: data.sold_quantity,
			description: description ? description.plain_text : null,
			category_id: data.category_id,
		},
		categories: categories ? formatCategory(categories) : null,
	}
}

const formatCategory = data => data.path_from_root.map(category => category.name);

module.exports = {
	formatSearch,
	formatItem,
	formatCategory,
}