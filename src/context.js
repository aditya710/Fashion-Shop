import React, { Component } from 'react'
import {menProducts, menProductsDetail} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        mproducts:[],
        mProductsDetail:menProductsDetail,
        cart:[],
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
        },
        () => {
            this.addTotals();
        }
        )
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
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return{cart:[...tempCart]}
        },
        () =>{
            this.addTotals();
        })
    }

    decrement = (id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        
        if(product.count === 0){
            this.removeItem(id);
        }
        else{
            product.total = product.count * product.price;
            this.setState(() => {
                return{cart:[...tempCart]}
            },
            () =>{
                this.addTotals();
            })
        }

    }

    removeItem = (id) =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() =>{
            return{
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },
        () =>{
            this.addTotals();
        })
    }

    clearCart = () =>{
        this.setState(() =>{
            return {cart:[]}
        },
        () =>{
            this.setProducts();
            this.addTotals();
        }
        )
    }

    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() =>{
            return{
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
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