import React, { /* useState, */ useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

function Quote({
  author_name, author_title, first_line, second_line
}) {
  const quoteRef = useRef();

  const isVisible = useIsVisible(quoteRef, { once: true });

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        quoteRef.current.querySelectorAll('.quote_container div').forEach(el => el.classList.add('visible'));
      }, 700);
    }
  }, [isVisible]);

  return (
    <div ref={quoteRef}>
      {(isVisible) && (
      <div className="quote_container">
        <div className="quote_element quote_mark">
          <img src={`${window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/img/icons/2022-rmt_report_quote.png`} alt="Quote icon" />
        </div>
        <div className="quote_element quote_text_upper">
          {first_line}
        </div>
        <div className="quote_element quote_text_lower">
          {second_line}
        </div>
        <div className="quote_element quote_signature">
          <div className="title">{author_title}</div>
          <div className="name">{author_name}</div>
        </div>
      </div>
      )}
    </div>
  );
}

Quote.propTypes = {
  author_name: PropTypes.string.isRequired,
  author_title: PropTypes.string.isRequired,
  first_line: PropTypes.string.isRequired,
  second_line: PropTypes.string.isRequired
};

Quote.defaultProps = {
};

export default memo(Quote);
