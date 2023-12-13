import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../../contexts/CartContext"

export function Cart() {
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext)

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">Ops... seu carrinho está vazio!</p>
                    <Link 
                        to="/"
                        className="bg-slate-600 my-3 p-1 px-3 text-white font-medium"
                    >
                        Acessar produtos
                    </Link>
                </div>
            )}

            {cart.map( (item) => (
                <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300 px-4 py-4">
                    <img 
                        src={item.cover} 
                        alt={item.title} 
                        className="w-10"
                    />

                    <strong>
                        Preço: {item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>

                    <div className="flex items-center justify-center gap-3">
                        <button onClick={ () => removeItemCart(item)} className="bg-slate-600 text-white rounded font-medium flex items-enter justify-center w-6 h-6">
                            -
                        </button>
                            {item.amount}
                        <button onClick={ () => addItemCart(item)} className="bg-slate-600 text-white rounded font-medium flex items-enter justify-center w-6 h-6">
                            +
                        </button>
                    </div>

                    <strong className="float-right">
                        Subtotal: {item.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>
                </section>
            ))}

            {cart.length !== 0 && (    
                <p className="font-bold mt-4">
                    Total: {total}
                </p>
            )}
        </div>
    )
}