import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/Home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void
    removeItemCart: (product: CartProps) => void
    total: string
}

interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider( {children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addItemCart(newItem: ProductProps) {
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        // Checa se o produto ainda não está no carrinho
        if(indexItem !== -1) {
            let cartList = cart;

            // Soma +1 na quantidade e calcula o total do carrinho
            cartList[indexItem].amount = cartList[indexItem].amount + 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

            //Atualiza a lista
            setCart(cartList)

            // Calcula o valor total do carrinho
            totalResultCart(cartList)

            return;
        }

        // Adiciona o item na lista
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        // Adiciona o novo item ao final da lista já existente
        setCart(products => [...products, data])

        // Calcula o valor total do carrinho
        totalResultCart([...cart, data])
    }

    function removeItemCart(product: CartProps) {
        // Busca a posição do id do produto na lista
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1) {
            // Diminui apenas 1 da quantidade
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
            
            setCart(cartList)
            totalResultCart(cartList)

            return;
        }

        // Devolve um array com todos os itens diferentes do id do produto clicado
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]) {
        let myCart = items;
        let result = myCart.reduce((acumulador, objeto) => { return acumulador + objeto.total}, 0)

        const resultFormated = result.toLocaleString("pt-BR", 
            {
                style: "currency",
                currency: "BRL"
            }
        )

        setTotal(resultFormated)
    }

    return(
        <CartContext.Provider 
            value={{ 
                cart, 
                cartAmount: cart.length, 
                addItemCart,
                removeItemCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;