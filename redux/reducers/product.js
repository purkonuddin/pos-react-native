import {CLEAR_CART, ADD_CART, PLUS_ITEM_CART, REDUCE_ITEM_CART, REDUCE_CART} from '../types';
const initialValue = {
    cart:[],
    productData: [],
    pagingProduct:[],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false,
    ajaxError: {}
  };
  
  const productReducer = (state = initialValue, action) => {
    const { cart, pagingProduct, productData } = state;
    let idItem;
    let index;
    let carts = []; 

    // if (action.error) {
    //   action.type = action.type+'_REJECTED';
    // }

    switch (action.type) {
      case "CLEAR_CART":
        return{
          ...state,
          cart:carts
        }
      case "ADD_CART":
        // const { cart, pagingProduct } = state;
        let addedItem = action.payload;// pagingProduct.splice(action.payload, 1);
        if (addedItem.stock > 0) {
          index = cart.findIndex(function(oncart){
            return oncart.id === addedItem.id
          })
          // console.log('add cart index :',index, addedItem.id);
          
          if (index < 0) {
            let newItem = Object.assign(addedItem,{qty:1})
            cart.push(newItem);
            let newState = { ...state, cart, pagingProduct };
            return newState; 
          }else{
            return {
              ...state,
              errMsg:'Item telah di tambahkan, cek keranjang belanja'
            }
          }
        }
      case "PLUS_ITEM_CART":
        // let { cart, pagingProduct } = state;
        idItem = action.payload;
        
        index = cart.findIndex(function(onCart){
          return onCart.id === idItem;
        });

        carts = [...cart];
        let selectedItem = {...carts[index]};
        selectedItem.qty += 1;
        carts[index] = selectedItem; 
        if(cart[index].stock >= selectedItem.qty){
          return { 
            ...state, 
            cart:carts, 
            pagingProduct 
          };
        } 
      case "REDUCE_ITEM_CART":
        idItem = action.payload;
        index = cart.findIndex(function(onCart){
          return onCart.id === idItem;
        });
        if (cart[index].qty > 1){
          
          let carts = state.cart;
          // console.log('...state.cart.reducers ??? ',carts);
          let cart = {...carts[index]};
          cart.qty -= 1;
          carts[index] = cart;
          let newState = {...state, cart:carts};
          return newState;
        }else{
          let carts = cart.filter(cart=>cart.id !== idItem);
          return {
            ...state,
            cart:carts,
            errMsg: `${idItem} telah dihapus dari keranjang belanja`
          }
        }
      case "REDUCE_CART":{  
        idItem = action.payload;
        carts = cart.filter(cart=>cart.id !== idItem);
        return {
          ...state,
          cart:carts,
          errMsg: `${idItem} telah dihapus dari keranjang belanja`
        }
      }
      case "GET_PRODUCT_PENDING":{
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      }
      case "GET_PRODUCT_REJECTED":{
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      }
      case "GET_PRODUCT_FULFILLED":{
        // console.log('product reducer =>',action.payload.data);
        
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productData: action.payload.data.data
        };
      }
      case "PAGING_PRODUCT_PENDING":{
        // console.log('pagination pending =>',action.payload);
        // console.log('actionstatus', action);
        
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false, 
        };
      }
      case "PAGING_PRODUCT_REJECTED":{
        // console.log('pagination rejected =>',action.payload);
        const { response } = action.payload;
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload,
          ajaxError: {
            status: response.status  
          }
        };
      }
      case "PAGING_PRODUCT_FULFILLED":{
        // console.log('actionstatus', action);
        // console.log('pagination fulfilled =>',action.payload);
        let curren_page = action.payload.data.curren_page; 
        let hasNextPages = action.payload.data.hasNextPages; 
        let newItems = action.payload.data.data;  
        // console.log('@@@ ','curren_page : ',action.payload.data.curren_page, 'hasNextPages : ',action.payload.data.hasNextPages, curren_page === 1 || hasNextPages === false);
        
        let currenItems = curren_page === 1 ? newItems : [...productData, ...newItems];
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productData: currenItems,
          pagingProduct: action.payload.data, 
        };
      }
      default:
        return state;
    }
  };
  
  export default productReducer;
  