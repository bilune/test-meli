import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SearchBox from './SearchBox';

const Navbar = (props) => (
	<nav className="navbar">
		<div className="container">
			<div className="row">
				<div className="navbar__container col-10 offset-1">
					<Link href="/">
						<a className="navbar__logo" >
							<img
								width="53"
								height="36"
								src="/static/Logo_ML.png"
								alt="Logo de Mercado Libre"
							/>
						</a>
					</Link>
					<SearchBox {...props} />
				</div>
			</div>
		</div>
	</nav>
);

Navbar.propTypes = {
	// Propiedad autoFocus que se utiliza en SearchBox
	autoFocus: PropTypes.bool,
}

export default Navbar;