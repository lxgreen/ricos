/* eslint-disable max-len */
import React from 'react';

const AlignRightIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M16 16v1H8v-1h8zm.001-4v1H4v-1h12.001zM16 8v1H8V8h8zm.001-4v1H4V4h12.001z"
              transform="translate(-417.000000, -177.000000) translate(413.000000, 173.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M14.8 5H4.2a.2.2 0 0 0-.2.2v.6c0 .11.09.2.2.2h10.6a.2.2 0 0 0 .2-.2v-.6a.2.2 0 0 0-.2-.2zm0 6H4.2a.2.2 0 0 0-.2.2v.6c0 .11.09.2.2.2h10.6a.2.2 0 0 0 .2-.2v-.6a.2.2 0 0 0-.2-.2zm0-3H8.2a.2.2 0 0 0-.2.2v.6c0 .11.09.2.2.2h6.6a.2.2 0 0 0 .2-.2v-.6a.2.2 0 0 0-.2-.2zm0 6h-4.6a.2.2 0 0 0-.2.2v.6c0 .11.09.2.2.2h4.6a.2.2 0 0 0 .2-.2v-.6a.2.2 0 0 0-.2-.2z"
      />
    </svg>
  );
};

export default AlignRightIcon;
