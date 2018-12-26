import React from 'react';
import PropTypes from 'prop-types';
import ProductJsonLd from '../utilities/ProductJsonLd';
import OpenGraph from '../utilities/OpenGraph';

import { formatNumber } from '../utilities/format';
import Loader from './Loader';
import withLoading from '../utilities/withLoading';

const ProductDetail = ({ id, title, picture, condition, sold_quantity, price, description }) => (
	<>
		<div className="product-detail">
			<div className="product-detail__main">

				{/* Imagen */}
				<div className="product-detail__image">
					<img src={picture} alt={title} />
				</div>
				<div className="product-detail__panel">
					<div className="product-detail__subtitle">
						{
							// Condición / cantidad vendidos
							`${condition === 'new' ? 'Nuevo' : condition === 'used' ? 'Usado' : ''} - 
							${sold_quantity} ${sold_quantity === 1 ? 'vendido' : 'vendidos'}`
						}
					</div>

					{/* Título */}
					<div className="product-detail__title">
						{title}
					</div>

					{/* Precio */}
					<div className="product-detail__price">
						<span>$</span>{' '}
						<span>{formatNumber(price.amount)}</span>
					</div>

					{/* Botón Comprar */}
					<button className="product-detail__buy-button">
						Comprar
					</button>
				</div>
			</div>

			{
				// Descripción
				description &&
				<div className="product-description">
					<div className="ProductDescription__title">
						Descripción del producto
					</div>
					<div className="product-description__body">
						{description}
					</div>
				</div>
			}
		</div>


		{/* SEO */}
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

		<OpenGraph
			title={title}
			description={description}
			image={picture}
			twitter="@mercadolibre"
		/>
	</>
);

ProductDetail.propTypes = {
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
	sold_quantity: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
}

export default withLoading(
	() => (
		<div className="product-detail">
			<Loader/>
		</div>
	)
)(ProductDetail);