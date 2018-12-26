import React from 'react';

import Layout from '../containers/Layout';
import Loader from '../components/Loader';
import withLoading from '../utilities/withLoading';

/**
 * Caja de búsqueda: "/"
 */
const Index = ({ loading }) => (
	<Layout title="MercadoLibre" focusNavbar>
		{ loading && <Loader /> }


	</Layout>
);

export default withLoading()(Index);