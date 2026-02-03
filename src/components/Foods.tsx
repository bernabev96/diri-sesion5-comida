import type { MenuItem } from '../entities/entities';

interface FoodsProps {
    foodItem: MenuItem[];
    onFoodSelected: (food: MenuItem) => void;
}

function Foods(props: FoodsProps) {
    return (
        <>
            <h4 className='foodTitle'>Carta</h4>
            <p className='hint'>Pulse sobre cada producto para añadirlo</p>
            <ul className='ulFoods'>
                {props.foodItem.map((item) => {
                    return (
                        <li key={item.id} className='liFood' onClick={() => props.onFoodSelected(item)} role='button' tabIndex={0}>
                            <img className='foodImg' src={`/images/${item.image}`} alt={item.name} />
                            <div className='foodItem'>
                                <p className='foodName'>{item.name}</p>
                                <p className='foodDesc'>{item.desc}</p>
                                <p className='foodPrice'>{item.price}€</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Foods;