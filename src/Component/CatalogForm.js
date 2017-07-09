import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FieldArray, Field, reduxForm } from 'redux-form';

import { fetchCatalog, saveCatalog } from '../actions';

const renderField = (field) => {
  return (
    <div className={field.meta.error && field.meta.touched?'has-error':''}>
      {field.label ? (
        <label htmlFor={field.id} className="control-label">
          { field.label }
        </label>
      ) : ''
      }

      <input id={field.id} className="form-control" type="text" {...field.input} />

      <div className="help-block">
        {field.meta.error && field.meta.touched?field.meta.error:''}
      </div>
    </div>
  );
};

const renderBulkPrices = ({ fields }) => {
  return (
    <div>
      {fields.map((bulkPrice, index) => (
        <div key={index} className="row" style={{ marginBottom: '1em' }}>
          <div className="col-xs-2">
            <button className="btn btn-xs btn-danger" type="button" onClick={() => fields.remove(index)}>
              <i className="glyphicon glyphicon-trash"></i>
            </button>
          </div>
          <div className="col-xs-5">
            <Field name={`${bulkPrice}.min`} component={renderField} className="form-control" placeholder="Min" />
          </div>
          <div className="col-xs-5">
            <Field name={`${bulkPrice}.price`} component={renderField} className="form-control" placeholder="Price" />
          </div>
        </div>
      ))}

      <div>
        <button type="button" onClick={() => fields.push()} className="btn btn-xs btn-info">
          <i className="glyphicon glyphicon-plus"></i> Add Bulk Price
        </button>
      </div>
    </div>
  );
};

const renderProductRows = ({ fields, meta }) => {
  return (
    <div className={ meta.error && meta.touched?'has-error':'' }>
      {fields.map((product, index) => (
        <div key={index} className="row" style={{ padding: '1em 0', borderBottom: '1px solid #ccc' }}>
          <div className="col-sm-1">
            <br/>
            <button className="btn btn-xs btn-danger" type="button" onClick={() => fields.remove(index)}>
              <i className="glyphicon glyphicon-trash"></i>
            </button>
          </div>
          <div className="col-sm-3">
            <Field id={`sku-${index}`} label="SKU" name={`${product}.sku`} component={renderField} />
          </div>
          <div className="col-sm-3">
            <Field id={`price-${index}`} label="Price" name={`${product}.price`} component={renderField} />
          </div>
          <div className="col-sm-5">
            <label className="control-label">
              Bulk Prices
            </label>
            <FieldArray name={`${product}.bulkPrices`} component={renderBulkPrices} />
          </div>
        </div>
      ))}

      <div style={{ marginTop: '1em' }}>
        <button type="button" onClick={() => fields.push({ bulkPrices: [{}] })} className="btn btn-xs btn-info">
          <i className="glyphicon glyphicon-plus"></i> Add Product
        </button>
      </div>

      {meta.error ?
      (<div className="help-block">{ meta.error }</div>)
      :
      (<div className="text-center"><br/><button type="submit" className="btn btn-primary">Save Catalog</button><Link to="/" className="btn btn-default">Cancel</Link></div>)
      }
    </div>
  );
};

class CatalogForm extends Component {
  componentWillMount() {
    this.props.fetchCatalog();
  }

  onSubmit(values) {
    saveCatalog(values, this.props.onCompleteCallback);
  }

  render() {
    const { handleSubmit, products } = this.props;

    return (
      <form className="form-horizontal" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <FieldArray name="products" component={renderProductRows} />
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.products || values.products.length < 1) {
    errors.products = { _error: 'At least ONE product must be in the catalog' };
  } else {
    const productErrors = [];

    values.products.forEach((product, index) => {
      const productError = {};

      if (!product.sku) {
        productError.sku = 'SKU must be defined.';
      }

      if (!product.price) {
        productError.price = 'Price must be defined.';
      } else {
        if (Number.isNaN(product.price - Number.parseFloat(product.price))) {
          productError.price = 'Price must be number.';
        } else if(product.price <= 0){
          productError.price = 'Price must greater than 0.';
        }
      }

      if (product.bulkPrices) {
        const bulkPriceErrors = [];

        product.bulkPrices.forEach((bulkPrice, index) => {
          const bulkPriceError = {};

          if (bulkPrice) {
            if (!bulkPrice.min) {
              bulkPriceError.min = 'Minimum must be defined.';
            } else {
              if (Number.isNaN(bulkPrice.min - Number.parseFloat(bulkPrice.min))) {
                bulkPriceError.min = 'Minimum must be number.';
              } else if(bulkPrice.min <= 0){
                bulkPriceError.min = 'Minimum must greater than 0.';
              }
            }

            if (!bulkPrice.price) {
              bulkPriceError.price = 'Price must be defined.';
            } else {
              if (Number.isNaN(bulkPrice.price - Number.parseFloat(bulkPrice.price))) {
                bulkPriceError.price = 'Price must be number.';
              } else if(bulkPrice.price <= 0){
                bulkPriceError.price = 'Price must greater than 0.';
              }
            }
          }

          if (Object.keys(bulkPriceError).length > 0) {
            bulkPriceErrors[index] = bulkPriceError;
          }
        });

        if (bulkPriceErrors.length > 0) {
          productError.bulkPrices = bulkPriceErrors;
        }
      }

      if (Object.keys(productError).length > 0) {
        productErrors[index] = productError;
      }
    });

    errors.products = productErrors;
  }

  return errors;
};

export default connect(
  (state) => {
    return {
      products: state.checkout.products,
      initialValues: {
        products: state.checkout.products
      }
    };
  }
  , { fetchCatalog, saveCatalog })
  (
    reduxForm({
      form: 'catalog',
      enableReinitialize: true,
      validate
    })(CatalogForm)
  );
