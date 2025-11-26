import React from 'react';

const PageHeader = ({ title, description }) => {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default PageHeader;
