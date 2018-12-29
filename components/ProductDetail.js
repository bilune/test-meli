import React from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from '../utilities/format';
import Loader from './Loader';
import withLoading from '../utilities/withLoading';
import { OpenGraph, ProductJsonLd } from '../utilities/SeoUtilities';

/**
 * El componente renderiza una vista de detalle de un producto en particular.
 */
const ProductDetail = ({ id, title, picture, condition, sold_quantity, price, description }) => (
	<>
		<section className="product-detail">
			<div className="product-detail__main">

				{/* Imagen */}
				<div className="product-detail__image">
					<img src={picture} alt={title} />
				</div>
				<section className="product-detail__panel">
					<div className="product-detail__subtitle">
						{
							// Condición / cantidad vendidos
							`${condition === 'new' ? 'Nuevo' : condition === 'used' ? 'Usado' : ''} - 
							${sold_quantity} ${sold_quantity === 1 ? 'vendido' : 'vendidos'}`
						}
					</div>

					{/* Título */}
					<h1 className="product-detail__title">
						{title}
					</h1>

					{/* Precio */}
					<div className="product-detail__price">
						<span>$</span>{' '}
						<span>{formatNumber(price.amount)}</span>
					</div>

					{/* Botón Comprar */}
					<button role="button" className="product-detail__buy-button">
						Comprar
					</button>
				</section>
			</div>

			{
				// Descripción
				description &&
				<article className="product-description">
					<h2 className="product-description__title">
						Descripción del producto
					</h2>
					<p className="product-description__body">
						{description}
					</p>
				</article>
			}
		</section>


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
			type="product"
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
	description: PropTypes.string,
}

const ProductWithLoader = () => (
	<div className="product-detail">
		<Loader/>
	</div>
);

export default withLoading(ProductWithLoader)(ProductDetail);