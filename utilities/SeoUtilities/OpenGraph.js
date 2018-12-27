import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const OpenGraph = ({ url, title, description, image, twitter }) => (
	<Head>
		{ url && <meta property="og:url" key="og:url" content={url} /> }
		{ title && <meta property="og:title" key="og:title" content={title} /> }
		{ description && <meta property="og:description" key="og:description" content={description} /> }
		{ image && <meta property="og:image" key="og:image" content={image} /> }
		{ twitter &&
			<>
				<meta name="twitter:card" key="twitter:card" content="product" />
				<meta name="twitter:site" key="twitter:site" content={twitter} />
			</>
		}
	</Head>
);

OpenGraph.propTypes = {
	url: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	twitter: PropTypes.string,
}

export default OpenGraph;