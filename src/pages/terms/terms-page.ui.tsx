import { Title } from '~shared/ui/title';
import { Card, CardContent, Typography } from '@mui/material';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent>
          <Typography variant="h4" className="font-bold mb-4">
            Условия использования
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящие условия использования регулируют отношения между
            пользователями и администрацией интернет-магазина в отношении
            предоставления услуг.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            1. Общие положения
          </Typography>
          <Typography variant="body1" paragraph>
            1.1. Настоящие условия определяют порядок использования
            интернет-магазина и программы лояльности.
          </Typography>
          <Typography variant="body1" paragraph>
            1.2. Использование сайта означает согласие с настоящими условиями.
          </Typography>
          
          <Typography variant="body1" paragraph>
            2.1. Пользователи могут получать бонусные баллы за покупки (1 балл
            за 50 сом).
          </Typography>
          <Typography variant="body1" paragraph>
            2.2. В день рождения пользователя предоставляется скидка 15%.
          </Typography>
          <Typography variant="body1" paragraph>
            2.3. При покупке шести наборов, седьмой предоставляется бесплатно.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            3. Оплата и доставка
          </Typography>
          <Typography variant="body1" paragraph>
            3.1. Оплата товаров осуществляется через интегрированные платежные
            системы.
          </Typography>
          <Typography variant="body1" paragraph>
            3.2. Доставка товаров осуществляется в течение 3-5 рабочих дней в
            зависимости от региона.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            4. Политика возвратов
          </Typography>
          <Typography variant="body1" paragraph>
            4.1. Возврат товаров возможен в течение 14 дней с момента покупки
            при соблюдении условий возврата.
          </Typography>
          <Typography variant="body1" paragraph>
            4.2. Товары должны быть возвращены в оригинальной упаковке без
            следов эксплуатации.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            5. Контакты
          </Typography>
          <Typography variant="body1" paragraph>
            5.1. По вопросам, связанным с работой интернет-магазина, можно
            обращаться в службу поддержки по указанным контактным данным на
            сайте.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
