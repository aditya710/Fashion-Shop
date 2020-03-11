import React, { Component } from 'react';
import MenProducts from './MenProducts';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class MenProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                    <Title name="men" title="products"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.mproducts.map( mproduct =>{
                                        return <MenProducts key={mproduct.id} mproduct={mproduct}/>;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
