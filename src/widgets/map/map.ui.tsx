import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Title } from '~shared/ui/title';

export const Map = () => {
  return (
    <section className="md:w-full p-6 md:p-0 flex flex-col items-center gap-8">
      <Title className="text-center">Карта филиалов</Title>

      <div className="flex flex-col md:flex-row md:justify-evenly items-center gap-6">
        <img src="/mockup.png" alt="Карта филиалов" className="md:h-[500px]" />

        <div className="flex flex-col gap-4">
          <div>
            <a
              className="p-2 my-2 inline-flex items-center gap-1 font-bold border border-violet text-violet rounded "
              href="https://2gis.kg/bishkek/branches/70000001049045031?m=74.553811%2C42.874095%2F10.89"
            >
              <img className='w-20' src="/2gis.png" alt="2ГИС" />
              <span>Адрес филиалов</span>
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Телефон</h3>
            <a
              href="tel:+996555123456"
              className="p-2 my-2 inline-block bg-violet text-white rounded transition duration-300 hover:bg-violet-dark"
            >
              +996 708 186 699
            </a>
          </div>
          <div>
            <Link
              to="/about"
              className="p-2 my-2 inline-block text-violet border border-violet rounded transition duration-300 hover:bg-violet hover:text-white"
            >
              Узнать о нас больше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


