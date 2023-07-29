import React from 'react';
import PropTypes from 'prop-types';

function Text({ onClick }) {

	// PROPS VALIDATION
	Text.propTypes = {
		onClick: PropTypes.func,
	}

	const handleClick = () => onClick();

	return (
		<>
			<h1>An Interactive Computer Story for Children</h1>
			<p>The duck story is a fun interactive story meant to help young children learn how to operate a mouse and keyboard.</p>
			<p>Many of todays kids grow up being proficient with mobile devices, but might feel a bit lost on a desktop computer. This fun, short, interactive story allows your child to take their first steps in learning how to use a desktop computer.</p>
			<p>A skill that will build a foundation for the rest of their life.</p>
				<button onClick={ handleClick }>Start the Story!</button>
		</>
	);
}

export default Text;
