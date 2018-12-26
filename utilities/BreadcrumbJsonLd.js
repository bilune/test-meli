import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const BreadcrumbJsonLd = ({ items }) => (
	<Head>
		<script
			key="breadcrumbjsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: `{
					"@context": "http://schema.org/",
					"@type": "BreadcrumbList",
					"itemListElement": ${
						JSON.stringify(items.map((item, i) => ({
							"@type": "ListItem",
							"position": i+1,
							"item": {
								"name": item,
								"@id": "https://mercadolibre.com.ar"
							}
						})), null, 4)
					}
				}`
			}}
		/>
	</Head>
);

BreadcrumbJsonLd.propTypes = {
	items: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default BreadcrumbJsonLd;