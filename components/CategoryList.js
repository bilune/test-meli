import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { BreadcrumbJsonLd } from '../utilities/SeoUtilities';

/**
 * Componente que renderiza una lista de categorías
 */
const CategoryList = ({ categories }) => (
	<Fragment>

		{/* Se setea la descripción en el
		header de acuerdo a las categorías */}
		<Head>
			<meta
				key="description"
				name="description"
				content={`Compralo en MercadoLibre. Encontrá más productos de ${categories.join(', ')}.`}
			/>
		</Head>

		<BreadcrumbJsonLd items={categories} />

		<section className="category-list" >
			{
				categories.map((category, i) =>
					<span
						key={`${category}${i}`}
						className="category-list__item"
					>
						{category}
					</span>
				)
			}
		</section>
	</Fragment>
);


CategoryList.propTypes = {
	// Lista de categorías
	categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CategoryList;