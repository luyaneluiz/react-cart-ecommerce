import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContext';
import { ProductProps } from '../Home';

import { BsCartPlus } from 'react-icons/bs';

import { toast } from 'react-hot-toast';

export function Detail() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<ProductProps>();
    const { addItemCart } = useContext(CartContext)

    useEffect(() => {
        async function getData() {
            const response = await api.get(`/products/${id}`)
            setData(response.data)
        }

        getData()
    }, [id]);

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
        <main>
            {data && (
                <section className="flex h-full my-4 mx-10 items-center gap-6">
                    <img 
                        className="rounded-lg max-h-80"
                        src={data?.cover} 
                        alt={data?.title} 
                    />

                    <aside className="flex flex-col gap-4">
                        <h2 className="font-medium text-lg mt-1 mb-2">{data?.title}</h2>

                        <p className="text-sm">{data?.description}</p>

                        <strong className="text-zinc-700/99">
                            {data?.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })} 
                        </strong>

                        <button className="bg-zinc-900 py-2 px-4 rounded flex items-center justify-center gap-3 text-white max-w-xs" onClick={() => handleAddCartItem(data)}>
                            <BsCartPlus size={20} color="#fff"/>
                            Adicionar ao carrinho
                        </button>
                    </aside>
                </section>
            )}

        </main>
    )
}