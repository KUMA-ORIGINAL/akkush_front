import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { pathKeys } from "~shared/lib/react-router";

export function Footer() {
  return (
    <Box component="footer" className="bg-black text-white py-14 px-6 md:px-20 border-t border-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to="/" className="flex items-center mb-6 lg:mb-0">
        <span>Ак Куш</span>
        {/* <img src="/logo.png"  className="h-[50px] rounded-full" alt="" /> */}
          {/* <Typography
            variant="h6"
            component="div"
            className="font-bold text-lg text-center lg:text-left"
          >
            Milcase
          </Typography> */}
        </Link>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to={pathKeys.about()} className="text-gray-400 hover:text-gold text-sm tracking-wide transition-colors">
            О платформе
          </Link>
          <Link to={pathKeys.catalog()} className="text-gray-400 hover:text-gold text-sm tracking-wide transition-colors">
            Каталог
          </Link>
          
          <Link to={pathKeys.terms()} className="text-gray-400 hover:text-gold text-sm tracking-wide transition-colors">
          Условия использования
          </Link>
          <Link to={pathKeys.policy()} className="text-gray-400 hover:text-gold text-sm tracking-wide transition-colors">
          Политика конфиденциальности
          </Link>
        </div>

        <div className="flex space-x-4 mt-6 lg:mt-0">
          <a
            href="https://t.me/yourTelegramLink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-colors block"
          >
            <TelegramIcon />
          </a>
          <a
            href="https://instagram.com/yourInstagramLink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-colors block"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://facebook.com/yourFacebookLink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gold transition-colors block"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600 pt-4">
        <Typography
          variant="body2"
          className="text-gray-400 text-center text-sm"
        >
          &copy; {new Date().getFullYear()} Ак Куш. Все права защищены.
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-400 text-center text-sm"
        >
          «Ак Куш» — учебный дипломный проект. Товары и бренды показаны в демонстрационных целях. Проект не связан с одноимённой реальной компанией.
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-400 text-center text-sm mt-2"
        >
          Developed by Asiya
        </Typography>
      </div>
    </Box>
  );
}
