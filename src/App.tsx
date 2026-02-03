import { useState, lazy, Suspense } from 'react'
import './App.css'
import type { MenuItem } from './entities/entities'
import FoodsOrder from './components/FoodsOrder';
import { foodItemsContext } from './context/foodItemsContext';

const Foods = lazy(() => import('./components/Foods'));

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      "id": 1,
      "name": "Hamburguesa de pollo",
      "quantity": 40,
      "desc": "Hamburguesa de pollo frito con lechuga, tomate, queso y mayonesa",
      "price": 24,
      "image": "cb.jpg"
    },
    {
      "id": 2,
      "name": "Hamburguesa de ternera",
      "quantity": 30,
      "desc": "Hamburguesa de ternera con lechuga, tomate, queso cheddar fundido y salsa Emmy",
      "price": 25,
      "image": "vb.jpg"
    },
    {
      "id": 3,
      "name": "Patatas fritas caseras",
      "quantity": 50,
      "desc": "Patatas fritas caseras crujientes y saladas",
      "price": 10,
      "image": "chips.jpg"
    },
    {
      "id": 4,
      "name": "Helado de Vainilla",
      "quantity": 30,
      "desc": "Helado de vainilla cremoso y dulce",
      "price": 5,
      "image": "ic.jpg"
    },
  ]);

  const handleFoodSelected = (food: MenuItem) => {
    setSelectedFood(food);
  }

  const handleReturnToMenu = () => {
    setSelectedFood(null);
    setIsChooseFoodPage(false);
  }

  return (
    <foodItemsContext.Provider value={{menuItems, setMenuItems}}>
      <div className="App">
        <button className='toggleButton' onClick={() => {setIsChooseFoodPage(!isChooseFoodPage); setSelectedFood(null);}}>{isChooseFoodPage ? 'Disponibilidad' : 'Pedir Comida'}</button>
        <h3 className='title'>Comida rápida online</h3>
        {!isChooseFoodPage && (
          <>
            <h4 className='subTitle'>Menús</h4>
            <ul className='ulApp'>
            {menuItems.map((item) => {
              return (
                <li key={item.id} className='liApp'>
                  <p className='stockName'>{item.name}</p>
                  <p className='stockQty'>#{item.quantity}</p>
                </li>
              );
            })}
            </ul>
          </>
        )}
        {isChooseFoodPage && (
          <Suspense fallback={<div>Cargando carta...</div>}>
            {!selectedFood ? (
              <Foods foodItem={menuItems} onFoodSelected={handleFoodSelected} />
            ) : (
              <FoodsOrder food={selectedFood}  onReturnToMenu={handleReturnToMenu} />
            )}
          </Suspense>
        )}
      </div>
    </foodItemsContext.Provider>
  );
}

export default App
