import React from 'react';

const ProgramCard = ({ program }) => {
  return (
    <div className="program-card" data-category={program.category}>
      <h3>
        <i className={`fas fa-${program.icon}`}></i> {program.title}
      </h3>
      <p>{program.description}</p>
      <div className="indicator-list">
        {program.indicators.map((indicator, index) => (
          <span key={index} className="indicator-item">
            {indicator}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgramCard;
