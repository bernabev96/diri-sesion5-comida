import { useState, useEffect, useContext } from "react";
import type { MenuItem } from '../entities/entities';
import { foodItemsContext } from "../context/foodItemsContext";

interface FoodsOrderProps {
    food: MenuItem;
    onReturnToMenu: () => void;
}

function FoodOrder(props: FoodsOrderProps) {
    const [quantity, setQuantity] = useState<string>('1');
    const [totalPrice, setToTalPrice] = useState(props.food.price);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const qtyNumber = quantity === '' ? 0 : Number(quantity);

    const context = useContext(foodItemsContext);
    if(!context){
        throw new Error("FoodOder debe usarse dentro de foodItemsContext.Provider");
    }
    const { setMenuItems } = context;

    useEffect(() => {
        setToTalPrice(qtyNumber * props.food.price);
    }, [qtyNumber, props.food.price]);

    const handleSendOrder = () => {
        if (!name.trim() || !phone.trim()) {
            alert('Por favor, complete su nombre y teléfono.');
            return;
        }
        const finalQty = Math.max(1, Math.min(props.food.quantity, qtyNumber));
        setIsConfirmed(true);
        setTimeout(() => {
            setMenuItems(prev =>
                prev.map(item => {
                    if(item.id !== props.food.id){
                        return item;
                    }
                    const newQty = Math.max(0, item.quantity - finalQty);
                    return {...item, quantity: newQty};
                })
            );
            props.onReturnToMenu();
        }, 2000);
    };

    return (
        <div className="orderCard">
            <h3 className="orderTitle">Pedido: {props.food.name}</h3>
            <img className="orderImg" src={`/images/${props.food.image}`} alt={props.food.name} />
            <p className="orderDesc">{props.food.desc}</p>
            <p className="orderTotal">Total: {totalPrice}€</p>
            <div className="orderRow">
                <label className="orderLabel">Cantidad</label>
                <input className="orderInput" type="number" min={1} max={props.food.quantity} value={quantity} onChange={(e) => {
                    setQuantity(e.target.value);
                    setIsConfirmed(false);
                }} onBlur={() => {
                    if(quantity === ''){
                        setQuantity('1');
                    }else{
                        const safe = Math.max(1, Math.min(props.food.quantity, Number(quantity)));
                        setQuantity(safe.toString());
                    }
                }}/>
            </div>
            <div className="orderRow">
                <label className="orderLabel">Nombre</label>
                <input className="orderInput" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre"/>
            </div>
            <div className="orderRow">
                <label className="orderLabel">Teléfono</label>
                <input className="orderInput" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Tu teléfono"/>
            </div>
            <div className="orderButtons">
                <button className="btnPrimary" onClick={handleSendOrder} disabled={qtyNumber < 1 || !name.trim() || !phone.trim()}>Enviar pedido</button>
                <button className="btnSecondary" onClick={props.onReturnToMenu}>Volver al menú</button>
            </div>
            {isConfirmed && <p className="orderOk">¡Pedido enviado! Recibirá un SMS una vez esté listo para recoger.</p>}
        </div>
    );
}

export default FoodOrder;