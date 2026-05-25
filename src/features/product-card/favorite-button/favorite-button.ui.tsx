import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { getCookie } from 'typescript-cookie';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { productQueries } from '~entities/product';

type FavoriteButtonProps = { id: number };

export function FavoriteButton(props: FavoriteButtonProps) {
  const isAuth = !!getCookie('access') && getCookie('access') !== 'undefined';
  const navigate = useNavigate();

  const { mutate: saveFavorite, isPending } = productQueries.useFavoriteProduct(
    props.id
  );
  const { data: favData } = productQueries.useGetFavoriteProducts();

  const favoriteArticles = favData?.data?.favoriteProducts;

  const handleSaveFavorite = useCallback(async () => {
    await saveFavorite();
  }, [saveFavorite]);

  if (!favData || !favData.data || !isAuth) {
    return (
      <Tooltip title={'Нужна авторизация'}>
        <span>
          <IconButton
            onClick={() => navigate(pathKeys.login())}
            aria-label="В Избранное"
          >
            <FavoriteBorderIcon fontSize="small" className="text-milk" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const isFavoritedPosts = favoriteArticles?.some(
    (post) => post.id === props.id
  );
  if (isPending) {
    return (
      <div className="p-1">
        <CircularProgress size={25} />
      </div>
    );
  }

  return (
    <Tooltip
      title={
        isFavoritedPosts ? 'Удалить из избранных' : 'Сохранить в избранные'
      }
    >
      <IconButton
        className="border border-black p-1 rounded-lg "
        onClick={handleSaveFavorite}
        aria-label="В Избранное"
      >
        {isFavoritedPosts ? (
          <FavoriteIcon fontSize="small" className="text-black" />
        ) : (
          <FavoriteBorderIcon fontSize="small" className="text-black" />
        )}
      </IconButton>
    </Tooltip>
  );
}

{
  /* <button
                className="border border-milk p-1 rounded-lg  "
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? (
                  <FavoriteIcon fontSize="small" className="text-milk" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" className="text-milk" />
                )}
              </button> */
}
