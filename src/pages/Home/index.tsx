import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCartPlus } from 'react-icons/bs'

import { api } from '../../services/api'

import { CartContext } from '../../contexts/CartContext';

import { toast } from 'react-hot-toast';

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string
}

export function Home() {
    const { addItemCart } = useContext(CartContext)
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products")
            setProducts(response.data)
        }

        getProducts()
    }, [])

    function handleAddCartItem(product: ProductProps) {
        addItemCart(product)

        toast.success('Produto adicionado com sucesso!', {
            style: {
               borderRadius: 10,
               backgroundColor: "#121212",
               color: "#fff" 
            }
        })
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
                    {products.map( (product) => (
                        <section 
                            key={product.id}
                            className="w-full flex flex-col items-center"
                        >
                            <Link to={`/products/${product.id}`}>
                                <img 
                                    className="rounded-lg max-h-72 mb-2"
                                    src={product.cover} 
                                    alt={product.title} 
                                />

                                <p className="font-medium mt-1 mb-2">{product.title}</p>
                            </Link>

                            <div className="flex gap-3 items-center">
                                <strong className="text-zinc-700/99">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })} 
                                </strong>

                                <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddCartItem(product)}>
                                    <BsCartPlus size={20} color="#fff"/>
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    )
}