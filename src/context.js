import React, { Component } from 'react'
import {menProducts, menProductsDetail} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        mproducts:[],
        mProductsDetail:menProductsDetail,
        cart:menProducts,
        modalOpen:false,
        modalProduct:menProductsDetail,
        storeModalOpen:false,
        storeModalProduct:menProductsDetail,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
    }

    componentDidMount(){
        this.setProducts();
    }

    setProducts = () =>{
        let tempProducts = [];
        menProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState(() =>{
            return{mproducts:tempProducts}
        })
    }

    getItem = (id) =>{
        const product = this.state.mproducts.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(() =>{
            return{mProductsDetail:product}
        })
    }

    addToCart = (id) =>{
        let tempProducts = [...this.state.mproducts];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return {products:tempProducts, cart:[...this.state.cart, product]};
        },() => console.log(this.state))
    }

    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(() => {
            return{modalProduct:product, modalOpen:true}
        })
    }

    openStoreModal = (id) =>{
        const sproduct = this.getItem(id);
        this.setState(() => {
            return{storeModalProduct:sproduct, storeModalOpen:true}
        })
    }

    closeModal = () =>{
        this.setState(() => {
            return{modalOpen:false}
        })
    }

    closeStoreModal = () =>{
        this.setState(() => {
            return{storeModalOpen:false}
        })
    }

    increment = (id) =>{
        console.log("This is Increment method");
    }

    decrement = (id) =>{
        console.log("This is Decrement method");
    }

    removeItem = (id) =>{
        console.log("Item Removed");
    }

    clearCart = () =>{
        console.log("Cart Cleared");
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal: this.openModal,
                closeModal:this.closeModal,
                openStoreModal: this.openStoreModal,
                closeStoreModal:this.closeStoreModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
                }}>

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };