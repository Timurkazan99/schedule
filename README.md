### Статус проверок:
[![eslint](https://github.com/Timurkazan99/schedule/actions/workflows/eslint.yml/badge.svg)](https://github.com/Timurkazan99/schedule/actions/workflows/eslint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/48ef3b812faf43b233f4/maintainability)](https://codeclimate.com/github/Timurkazan99/schedule/maintainability)
### Описание:
Интерактивное расписание

[Пример приложения](http://ovz1.j66826829.wmekm.vps.myjino.ru/schedule/)

### Функционал:

- Авторизация
    - По логину и паролю
    - Ленивая по JWT токену
- Пользователи
    - Создание
    - Редактирование
- Локации
    - Создание
    - Редактирование
    - Добавление шаблонов смен
    - Изменение шаблонов смен
- Расписание
    - Создание смен
    - Изменение смен
    - Выгрузка в excel файл
- Посещаемость
    - Вывод итогов за определенный период
    - Выгрузка в excel файл
- Загрузка из excel файла

### Использованный стек:
- Event source
- Построение приложения - React
- State management - Redux Toolkit
- Маршрутизация - React-router
- Работа с формами - Formik
- Валидация - yup
- Верстка страницы - react-bootstrap
- Уведомления об операция - React-Toastify
- Сетевые запросы - axios

### Установка
`npm install`

### Сборка проекта
`npm run build`