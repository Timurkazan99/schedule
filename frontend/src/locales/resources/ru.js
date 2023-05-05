const ru = {
  translation: {
    errorPage: {
      pageNotFound: 'Страница не найдена',
      mainPage: 'Перейти на главную страницу',
    },
    navBar: {
      menu: 'Меню',
      profile: 'Профиль',
      schedule: 'Расписание',
      employees: 'Сотрудники',
      locations: 'Локации',
      attendance: 'Посещаемость',
      upload: 'Загрузить',
      logout: 'Выйти',
      noNotification: 'Нет уведомлений',
    },
    resetPassword: {
      // labels
      title: 'Восстановление пароля',
      success: 'Пароль изменен!',
      checkEmail: 'Запрос на восстановление отправлен на ваш емайл',

      // field
      email: 'Ваш емайл',
      password: 'Новый пароль',
      passwordConfirmation: 'Подтверждение пароля',

      // buttons
      back: '< Назад',
      login: 'Авторизоваться',
      send: 'Отправить',

      // errors
      errorBadEmail: 'Неверный email',
    },
    auth: {
      title: 'Авторизация',
      email: 'Электронная почта',
      password: 'Пароль',
      login: 'Войти',
      forgotPassword: 'Забыли пароль?',
      // errors
      errorBadEmailOrPasswords: 'Неверный email или пароль',
    },
    shifts: {
      // fields
      date: 'Дата',
      employee: 'Сотрудник',
      beginAt: 'Начало смены',
      endAt: 'Конец смены',
      location: 'Локация',
      template: 'Шаблон',
      bonus: 'Надбавка',
      penalty: 'Штраф',
      employeeSelect: 'Выбрать сотрудника',

      // another shift
      another: 'Другая смена',
      free: 'Свободная смена',

      // weekdays
      monday: 'Пн',
      tuesday: 'Вт',
      wednesday: 'Ср',
      thursday: 'Чт',
      friday: 'Пт',
      saturday: 'Сб',
      sunday: 'Вс',

      // buttons
      createBtn: 'Создать',
      createdBtn: 'Создано',
      uploadBtn: 'Загрузить',
      take: 'Взять смену',
      delete: 'Удалить',
      toFreeShift: 'В свободные смены',

      // toast
      createToast: 'Смена создана',
      assignToast: 'Смена назначена',
      deleteToast: 'Смена удалёна',
      toFreeShiftToast: 'Смена изменена на свободную',
    },
    templates: {
      // fields
      name: 'Название смены',
      beginAt: 'Начало смены',
      endAt: 'Конец смены',
      break: 'Перерыв',

      // buttons
      delete: 'Удалить',

      // toast
      createToast: 'Шаблон создан',
      updateToast: 'Шаблон изменен',
      deleteToast: 'Шаблон удалён',
    },
    schedule: {
      // fields
      startPeriod: 'С',
      endPeriod: 'До',
      locationName: 'Название локации',
      location: 'Выбрать локацию',
      all: 'Скачать всё',

      // labels
      employees: 'Сотрудники',
      myShift: 'Мои смены',
      freeShift: 'Свободная смена',
      date: 'Дата',
      time: 'Время работы',
      locationLabel: 'Локация',
      bonus: 'Надбавка',
      penalty: 'Штраф',
      description: 'Дата: {{date}}\nВремя работы: {{begin}} – {{end}}\nЛокация: {{location}}\nНадбавка: {{bonus}}\nШтраф: {{penalty}}',

      // buttons
      week: 'Неделя',
      month: 'Месяц',
      back: '<',
      next: '>',

      // toast
      downloadToast: 'Начата загрузка',
    },
    users: {
      // fields
      name: 'Имя',
      phone: 'Номер телефона',
      position: 'Должность',
      surname: 'Фамилия',
      email: 'Электронная почта',
      salary: 'Зарплата',
      isAdmin: 'Это админ?',
      location: 'Локация',
      emptyLocation: 'Без локации',
      penalties: 'Штрафы',
      bonuses: 'Бонусы',
      time: 'Отработанные часы',
      total: 'Итого',
      confirmPassword: 'Подтверждение пароля',

      // labels
      fullName: 'Полное имя',
      description: 'Должность: {{position}}\nНомер: {{phone}}\nEmail: {{email}}',

      // buttons
      find: 'Найти',
      add: 'Добавить',
      edit: 'Редактировать',
      update: 'Сохранить',
      delete: 'Удалить',

      // toast
      createToast: 'Сотрудник создан',
      updateToast: 'Сотрудник изменен',
      updateProfileToast: 'Профиль изменён',
      deleteToast: 'Сотрудник удалён',
    },
    locations: {
      // fields
      name: 'Название локации',
      address: 'Адрес локации',
      color: 'Цвет локации:',
      find: 'Найти',

      // labels
      description: 'Название: {{name}}\nАдрес: {{address}}',
      template: 'Смены:',
      nameLabel: 'Название',
      colorLabel: 'Цвет',
      addressLabel: 'Адрес',
      templateLabel: 'Смены',

      // buttons
      add: 'Добавить локацию',
      edit: 'Редактировать локацию',
      addTemplate: 'Добавить смену',
      delete: 'Удалить',

      // toast
      createToast: 'Локация создана',
      updateToast: 'Локация изменена',
      deleteToast: 'Локация удалёна',
    },
    attendance: {
      // fields
      startPeriod: 'С',
      endPeriod: 'До',

      // labels
      fullName: 'Полное имя',
      position: 'Должность',
      time: 'Отработаное время (ч)',
      salary: 'Базовая ставка (р/ч)',
      bonus: 'Бонусы (р)',
      penalty: 'Штрафы (р)',
      total: 'Итого (р)',
      description: 'Должность: {{position}}\nОтработаное время: {{time}} ч\nБазовая ставка: {{salary}} р\\ч \nБонусы: {{bonuses}} р\nШтрафы: {{penalties}} р\nИтого: {{total}} р\n',

      // buttons
      calculate: 'Рассчитать',

      // toast
      downloadToast: 'Начата загрузка',
    },
    modal: {
      // tittles
      addUser: 'Добавить сотрудника',
      editUser: 'Редактировать сотрудника',
      addLocation: 'Добавить локацию',
      editLocation: 'Редактировать локацию',
      addTemplate: 'Добавить смену',
      editTemplate: 'Редактировать смену',
      infoTemplate: 'Информация',
      createShift: '{{date}} Добавить смену',
      editShift: '{{date}} Редактировать  смену',
      infoShift: '{{date}} Информация',
      downloadSchedule: 'Скачать расписание',
      downloadAttendance: 'Скачать расчётку',
      changePeriod: 'Выберете период',

      // buttons
      close: 'Закрыть',
      download: 'Скачать',
      add: 'Добавить',
      edit: 'Редактировать',
      calculate: 'Расчитать',
    },
  },
};

export default ru;
