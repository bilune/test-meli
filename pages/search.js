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

SearchPage.getInitialProps = async context => {
	const { search } = context.query;
	const res = await axios.get(`http://localhost:3000/api/items?q=${search}`);
	const { data } = res;
	return { data, search };
}

export default SearchPage;
