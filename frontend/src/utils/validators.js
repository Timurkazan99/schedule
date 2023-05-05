import * as Yup from 'yup';
import 'yup-phone';

const colorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const timeRegExp = /^(?:[01]?\d|2[0-3])(?::[0-5]\d){1,2}$/;
const dateRegExp = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/;

export const UserSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  surname: Yup.string().required('Обязательное поле'),
  phone: Yup.string().notRequired().matches(phoneRegExp, 'Некорректный номер'),
  email: Yup.string()
    .email('Некорректный емейл')
    .required('Обязательное поле'),
  position: Yup.string().required('Обязательное поле'),
  salary: Yup.number().required('Обязательное поле'),
});

export const LocationSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  color: Yup.string().matches(colorRegExp).required('Обязательное поле'),
});

export const templateSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  beginAt: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ').required('Обязательное поле'),
  endAt: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ').required('Обязательное поле'),
  break: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ'),
});

export const FormSchema = Yup.object({
  beginAt: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ').required('Обязательное поле'),
  endAt: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ').required('Обязательное поле'),
  bonus: Yup.number('Бонус должен быть числом'),
  penalty: Yup.number('Штраф должен быть числом'),
  break: Yup.string().matches(timeRegExp, 'Время должно быть в формате ЧЧ:ММ'),
});

export const SignupSchema = Yup.object({
  name: Yup.string('Обязательное поле')
    .min(3, 'Имя должно быть от 3 до 20 символов')
    .max(20, 'Имя должно быть от 3 до 20 символов')
    .required('Обязательное поле'),
  surname: Yup.string('Обязательное поле')
    .min(3, 'Фамилия должна быть от 3 до 20 символов')
    .max(20, 'Фамилия должна быть от 3 до 20 символов')
    .required('Обязательное поле'),
  email: Yup.string('Обязательное поле').email('Некорректный емейл').required('Обязательное поле'),
  phone: Yup.string()
    .notRequired()
    .matches(phoneRegExp, 'Некорректный номер'),
  password: Yup.string()
    .min(6, 'Пароль должен быть от 6 символов')
    .notRequired(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const EmailSchema = Yup.object({
  email: Yup.string().email('Некорректный емейл').required('Обязательное поле'),
});

export const PasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Пароль должен быть от 6 символов')
    .notRequired(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const PeriodSchema = Yup.object({
  startPeriod: Yup.string().matches(dateRegExp, 'Дата должна быть в формате dd.mm.yyyy'),
  endPeriod: Yup.string().matches(dateRegExp, 'Дата должна быть в формате dd.mm.yyyy'),
});
