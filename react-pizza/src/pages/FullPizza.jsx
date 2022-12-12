import axios from 'axios'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function FullPizza() {
    const [pizza, setPizza] = React.useState()
    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://6329d2b14c626ff832cb763a.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пицц')
                navigate('/')
            }
        }
        fetchPizza()
    },[])

    if(!pizza) {
        return 'Загрузка...'
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}p</h4>
        </div>
    )
}

export default FullPizza
