import { Card, CardContent, Typography } from "@mui/material";

export const PolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent>
          <Typography variant="h4" className="font-bold mb-4">
            Политика конфиденциальности
          </Typography>
          <Typography variant="body1" paragraph>
            Настоящая Политика конфиденциальности регулирует обработку и защиту персональных данных пользователей интернет-магазина.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            1. Сбор и использование персональных данных
          </Typography>
          <Typography variant="body1" paragraph>
            1.1. Мы собираем персональные данные, такие как имя, контактные данные, адрес доставки и платежная информация, при регистрации и оформлении заказа.
          </Typography>
          <Typography variant="body1" paragraph>
            1.2. Данные используются для обработки заказов, предоставления персонализированных предложений и улучшения качества сервиса.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            2. Защита данных
          </Typography>
          <Typography variant="body1" paragraph>
            2.1. Мы принимаем меры по защите данных от несанкционированного доступа, изменения или уничтожения.
          </Typography>
          <Typography variant="body1" paragraph>
            2.2. Доступ к персональным данным имеет ограниченное количество сотрудников, которым это необходимо для выполнения их обязанностей.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            3. Передача данных третьим лицам
          </Typography>
          <Typography variant="body1" paragraph>
            3.1. Мы не передаем персональные данные третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            4. Хранение данных
          </Typography>
          <Typography variant="body1" paragraph>
            4.1. Персональные данные хранятся в течение срока, необходимого для выполнения целей их обработки, или в соответствии с законодательными требованиями.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            5. Права пользователя
          </Typography>
          <Typography variant="body1" paragraph>
            5.1. Пользователь имеет право запросить информацию о своих персональных данных, изменить или удалить их, обратившись в службу поддержки.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            6. Изменения политики
          </Typography>
          <Typography variant="body1" paragraph>
            6.1. Мы оставляем за собой право изменять настоящую политику конфиденциальности, уведомляя пользователей о значительных изменениях.
          </Typography>
          <Typography variant="h5" className="font-semibold mt-4">
            7. Контакты
          </Typography>
          <Typography variant="body1" paragraph>
            7.1. По вопросам, связанным с обработкой персональных данных, можно обратиться в службу поддержки.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

