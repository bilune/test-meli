import React from 'react';
import axios from 'axios';

import Layout from '../containers/Layout';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

/**
 * Resultado de la búsqueda: "/items?search="
*/
const SearchPage = ({ data, search }) => (
	<Layout title={`${search} en Mercado Libre Argentina`}>
		<CategoryList categories={data.categories} />
		<ProductList items={data.items}/>
	</Layout>
);

SearchPage.getInitialProps = async ({ req, query }) => {
	const origin = req ? `${req.protocol}://${req.get('Host')}` : window.location.origin;
	try {
		const { search } = query;
		const res = await axios.get(`${origin}/api/items?q=${search}`);
		const { data } = res;
		return { data, search };
	} catch (error) {
		const err = new Error();
		err.code = 'ENOENT';
		throw err;
	}
}

export default SearchPage;
