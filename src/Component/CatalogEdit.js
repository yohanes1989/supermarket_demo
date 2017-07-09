import React from 'react';
import { connect } from 'react-redux';

import CatalogForm from './CatalogForm';
import { fetchCatalog } from '../actions';

export default connect(null, { fetchCatalog })((props) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      Catalog Form
    </div>
    <div className="panel-body">
      <CatalogForm onCompleteCallback={() => props.history.push('/')} />
    </div>
  </div>
));
