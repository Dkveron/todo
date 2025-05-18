import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

function Footer({ count, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button type="button" className={filter === 'done' ? 'selected' : ''} onClick={() => onFilterChange('done')}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  count: PropTypes.number,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  count: 0,
  filter: 'all',
};

export default Footer;
