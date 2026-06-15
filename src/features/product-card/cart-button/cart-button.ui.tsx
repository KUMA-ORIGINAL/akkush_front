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
    <div className={isDetail ? '' : 'flex-1 min-w-0'}>
      {quantity === 0 ? (
        <button
          className={
            isDetail
              ? 'min-w-[260px] rounded-full bg-milk px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-black'
              : 'w-full flex items-center justify-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium tracking-wide text-white bg-black rounded-lg transition-colors duration-300 hover:bg-[#333] active:scale-[0.98]'
          }
          onClick={() => handleAction(() => setQuantity(1))}
        >
          {!isDetail && (
            <ShoppingCartIcon sx={{ fontSize: 16 }} className="text-inherit shrink-0" />
          )}
          {isDetail ? 'Положить товар в корзину' : 'В корзину'}
        </button>
      ) : (
        <div className="w-full flex items-center justify-between gap-1 rounded-lg border border-black px-1">
          <IconButton
            size="small"
            onClick={() => handleAction(() => setQuantity((prev) => Math.max(prev - 1, 0)))}
            aria-label="Уменьшить"
          >
            <IndeterminateCheckBoxRoundedIcon sx={{ fontSize: 22 }} className="text-black" />
          </IconButton>

          <span className="text-base font-semibold text-black">{quantity}</span>

          <IconButton
            size="small"
            onClick={() => handleAction(() => setQuantity((prev) => prev + 1))}
            aria-label="Добавить"
          >
            <AddBoxIcon sx={{ fontSize: 22 }} className="text-black" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
