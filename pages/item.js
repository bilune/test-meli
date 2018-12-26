import React from 'react';
import axios from 'axios';

import Layout from '../containers/Layout';
import CategoryList from '../components/CategoryList';
import ProductDetail from '../components/ProductDetail';

/**
 * Detalle del producto: "/items/:id"
 */
const SearchPage = ({ data }) => (
	<Layout
		title={`${data.item.title} - $ ${data.item.price.amount} en Mercado Libre`}
	>
		<CategoryList categories={data.categories} />
		<ProductDetail {...data.item} />
	</Layout>
);

SearchPage.getInitialProps = async context => {
	try {
		const { id } = context.query;
		const res = await axios.get(`http://localhost:3000/api/items/${id}`);
		const { data } = res;
		return { data };

	} catch (error) {
		const err = new Error();
		err.code = 'ENOENT';
		throw err;
	}
}

export default SearchPage;
