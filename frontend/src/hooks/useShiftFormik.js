import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getFiltredData, getSelectedShift, getUserById } from '../store/selectors';
import { FormSchema } from '../utils/validators';
import useShiftSubmit from './useShiftSubmit';
import isFreeShift from '../utils';

const makeGetTemplateIdByLocationId = (templates) => (id) => templates.find(({ locationId }) => locationId === Number(id))?.id;
const makeGetTemplateById = (templates) => (id) => templates.find((template) => template.id === Number(id));

export default function useShiftFormik(edit, days, user, { isAdmin, id }) {
  const { userLocs } = useSelector((state) => getUserById(state, id));
  const [locations, templates] = useSelector((state) => getFiltredData(state, userLocs, isAdmin));
  const shift = useSelector(getSelectedShift);
  const onSubmit = useShiftSubmit(edit, days, user, shift);

  const initialValues = {
    userId: String(user),
    locationId: String(locations[0]?.id || 'null'),
    templateId: 'null',
    beginAt: '08:00',
    endAt: '18:00',
    break: '01:00',
    bonus: '0',
    penalty: '0',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit,
  });

  const getTemplateIdByLocationId = makeGetTemplateIdByLocationId(templates);
  const getTemplateById = makeGetTemplateById(templates);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (edit) {
      formik.setValues({
        userId: String(user),
        locationId: String(shift?.locationId),
        templateId: shift?.templateId ? String(shift?.templateId) : 'null',
        beginAt: String(shift?.beginAt),
        endAt: String(shift?.endAt),
        break: shift?.break,
        bonus: shift?.bonus,
        penalty: shift?.penalty,
      });
    }
  }, []);

  useEffect(() => {
    if (formik.values.templateId !== 'undefined') {
      if (!isFreeShift(formik.values.templateId)) {
        const type = getTemplateById(formik.values.templateId);
        formik.values.beginAt = String(type?.beginAt);
        formik.values.endAt = String(type?.endAt);
        formik.values.break = String(type?.break);
      } else if (shift?.break === '00:00') {
        formik.values.break = '01:00';
      }
    }
    formik.validateForm();
  }, [formik.values.templateId]);

  useEffect(() => {
    const templateId = getTemplateIdByLocationId(formik.values.locationId);
    console.log(templateId);
    formik.values.templateId = templateId || 'null';
  }, [formik.values.locationId]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { formik, locations, templates };
}
