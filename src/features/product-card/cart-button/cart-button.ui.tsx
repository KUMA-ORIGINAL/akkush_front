import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

export const CartButton = ({ product, variant = 'card' }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const isAuth = !!getCookie('access') && getCookie('access') !== 'undefined';
  const isDetail = variant === 'detail';

  const handleAction = (action: () => void) => {
    if (!isAuth) {
      navigate(pathKeys.login());
      return;
    }
    action();
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};
    if (cartData[product.id]) {
      setQuantity(cartData[product.id].quantity);
    }
  }, [product.id]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};

    if (quantity > 0) {
      cartData[product.id] = {
        ...product,
        quantity,
      };
    } else {
      delete cartData[product.id]; // Если 0, удаляем товар
    }

    localStorage.setItem('CARTStorage', JSON.stringify(cartData));
  }, [quantity, product]);

  return (
    <div>
      {quantity === 0 ? (
        <button
          className={
            isDetail
              ? 'min-w-[260px] rounded-full bg-milk px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-black'
              : 'px-4 py-1 border text-black hover:bg-black transition-all duration-300 hover:text-white border-black rounded-lg flex items-center gap-2'
          }
          onClick={() => handleAction(() => setQuantity(1))}
        >
          {!isDetail && <ShoppingCartIcon className="text-inherit" />}
          {isDetail ? 'Положить товар в корзину' : 'В корзину'}
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded border border-violet">
          <IconButton
            className="border border-black p-1 rounded-lg"
            onClick={() => handleAction(() => setQuantity((prev) => Math.max(prev - 1, 0)))}
            aria-label="Уменьшить"
          >
            <IndeterminateCheckBoxRoundedIcon className="text-black" />
          </IconButton>

          <span className="text-lg font-semibold text-black">{quantity}</span>

          <IconButton
            className="p-1 rounded-lg"
            onClick={() => handleAction(() => setQuantity((prev) => prev + 1))}
            aria-label="Добавить"
          >
            <AddBoxIcon className="text-black" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
