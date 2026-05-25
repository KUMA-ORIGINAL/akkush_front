import { ProductList } from '~widgets/product-list';
import { Bestsellers } from '~widgets/bestsellers';
import { Map } from '~widgets/map';
import { AdProducts } from '~widgets/ad-products';
import { userQueries } from '~entities/user';
import PercentIcon from '@mui/icons-material/Percent';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { WelcomeDiscount } from '~widgets/welcome-discount';
import { productQueries } from '~entities/product';
import { TrendingList } from '~widgets/trending-list';

export function HomePage() {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const showBanner = userData?.data?.cluster === 'K4';
  const trendingBlock = userData?.data?.cluster === 'K3';

  return (
    <div className="w-full my-10 flex justify-center items-center flex-col gap-6">
      <AdProducts />
      {showBanner && (
        <WelcomeDiscount discount={userData.data.welcomeDiscount} />
      )}
      {trendingBlock && <TrendingList />}
      <ProductList />
      <Bestsellers />
      {/* <Map /> */}
    </div>
  );
}
