import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const ProductJsonLd = ({ name, offers, image }) => (
	<Head>
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: `{
					"@context": "http://schema.org/",
					"@type": "Product",
					"name": "${name}",
					"image": ["${image}"],
					"offers": {
						"@type": "Offer",
						"price": "${offers.price}",
						"priceCurrency": "${offers.priceCurrency}",
						"itemCondition": "${offers.itemCondition}"
					}
				}`
			}}
		/>
	</Head>
);

ProductJsonLd.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	offers: PropTypes.shape({
		price: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		priceCurrency: PropTypes.string.isRequired,
		itemCondition: PropTypes.oneOf([
			'https://schema.org/NewCondition',
			'https://schema.org/UsedCondition'
		]),
	}).isRequired
}

export default ProductJsonLd;

