import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { formatNumber } from '../utilities/format';
import { ProductJsonLd } from '../utilities/SeoUtilities';

/**
 * Componente que renderiza una ficha de producto dentro de un ProductList
 */
const Product = ({ id, picture, title, price, location, free_shipping, condition }) => (
	<>
		<li className="product">
			<Link
				href={{ pathname: '/item', query: { id } }}
				as={`/items/${id}`}
				prefetch
			>
				<a className="product__container">

					{/* Imagen */}
					<img width={180} height={180} src={picture} alt={title} className="product__image"/>

					<div className="product__info">
						<div className="product__first-row">

							{/* Precio */}
							<div className="product__price">
								<span>$ {formatNumber(price.amount)}</span>

								{
									free_shipping &&
									<img
										className="product__shipping"
										src="/static/ic_shipping.png"
										alt="Envío gratis"
									/>
								}
							</div>

							{/* Ubicación */}
							<div className="product__location">{location}</div>
						</div>

						{/* Título */}
						<div className="product__title">{title}</div>
					</div>
				</a>
			</Link>
		</li>

		<ProductJsonLd
			id={id}
			name={title}
			image={picture}
			offers={{
				price: price.amount,
				priceCurrency: price.currency,
				itemCondition: condition === 'new' ?
					'https://schema.org/NewCondition' :
					'https://schema.org/UsedCondition',
			}}
		/>
	</>
);

Product.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.shape({
		currency: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		decimals: PropTypes.number.isRequired,
	}).isRequired,
	picture: PropTypes.string.isRequired,
	condition: PropTypes.string.isRequired,
	free_shipping: PropTypes.bool.isRequired,
	location: PropTypes.string.isRequired,
}

export default Product;