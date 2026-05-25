import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import PercentIcon from '@mui/icons-material/Percent';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

export const WelcomeDiscount = ({discount}) => {
  return (
    <div className='w-full px-4'>
    <div className="w-full rounded-xl bg-gradient-to-r from-black to-milk p-6">
      <div className="w-full mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
          <div className="px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3">
                <PercentIcon />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Скидка {discount}%</h2>
                <p className="mt-[-5px] text-white">на все товары в нашем магазине</p>
              </div>
            </div>
            <Link
              to={pathKeys.cart()}
              className="bg-white flex gap-1 text-black px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              В корзину
              <ShoppingCartRoundedIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};