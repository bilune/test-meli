import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Head from 'next/head';

import OpenGraph from '../utilities/OpenGraph';

/**
 * Este componente renderiza un layout alrededor de los componentes
 * de la página, que incluye el Navbar y setea el title del documento
 */
const Layout = ({ title, children, focusNavbar }) => (
	<>
		<Head>
			<title>{title}</title>
			<OpenGraph title={title} />
		</Head>

		<Navbar autoFocus={focusNavbar} />
		<div className="container">
			<div className="row">
				<div className="col col-md-10 offset-md-1">
					{children}
				</div>
			</div>
		</div>
	</>
);

Layout.propTypes = {
	focusNavbar: PropTypes.bool,
}

export default Layout;