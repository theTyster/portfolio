import { PropTypes } from 'prop-types';


function NewTabLink({ link, children }){
  NewTabLink.propTypes = {
    link: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
  }
  return (
    <a href={ link }
    rel="noreferrer noopenner"
    target="_blank"
  >
    { children }
  </a>
  )
}

export default NewTabLink;
