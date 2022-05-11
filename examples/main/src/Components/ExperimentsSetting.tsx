import React, { useState } from 'react';

export const ExperimentsSetting = ({ items, active, action }) => {
  const [ref, setRef] = useState(null);
  const [experimentSearchTerm, setExperimentSearchTerm] = useState('');

  const isSearchInputFocus = document.activeElement.contains(ref);
  if (!isSearchInputFocus && experimentSearchTerm !== '') {
    setExperimentSearchTerm('');
  }

  return (
    <>
      <li key="experimentSearch" className="experimentContainer">
        <input
          type="text"
          placeholder="Search for experiment"
          value={experimentSearchTerm}
          onChange={e => setExperimentSearchTerm(e.target.value)}
          ref={setRef}
        />
      </li>
      {items.map(
        ({ name, scope, input = ['true', 'false'] }) =>
          name.includes(experimentSearchTerm) && (
            <li key={name} className="experimentContainer">
              <div className="experiment">
                <div className="scope">{scope}</div>
                <div className="experimentTitle">{`specs.${scope}.${name}`}</div>
                <div className="options">
                  {input.map((value, index) => (
                    /* eslint-disable */
                    <div
                      key={index}
                      className={`option ${active?.[name]?.value === value ? 'active' : null}`}
                      onClick={() => action(name, value)}
                    >
                      {value}
                    </div>
                    /* eslint-enable */
                  ))}
                </div>
              </div>
            </li>
          )
      )}
    </>
  );
};
