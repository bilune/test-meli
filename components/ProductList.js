import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';
import Loader from './Loader';
import withLoading from '../utilities/withLoading';

/**
 * Rendenriza una lista de Productos
 */
const ProductList = ({ items, loading }) => {
	return (
		<section>
			<ol className="product-list">
				{
					loading ?
					<Loader/> :

					items &&
					items.map(product => 
						<Product key={product.id} {...product} />
					)
				}
			</ol>
		</section>
	);
}

ProductList.propTypes = {
	// Lista de productos
	items: PropTypes.array.isRequired,
	//Se obtiene a través de withLoading
	loading: PropTypes.bool,
}

export default withLoading()(ProductList);