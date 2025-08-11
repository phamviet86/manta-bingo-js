// path: @/components/hookuseForm.js

import { useRef, useState } from "react";

export function useForm() {
  // Refs
  const formRef = useRef();

  // State
  const [initialValues, setInitialValues] = useState({});
  const [requestParams, setRequestParams] = useState({});
  const [deleteParams, setDeleteParams] = useState({});
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setInitialValues({});
    setRequestParams({});
    setDeleteParams({});
  };

  const reset = () => {
    formRef?.current?.resetFields();
  };

  const setValues = (values) => {
    formRef?.current?.setFieldsValue(values);
  };

  const getValues = () => {
    return formRef?.current?.getFieldsValue();
  };

  const getValue = (name) => {
    return formRef?.current?.getFieldValue(name);
  };

  const submit = async () => {
    formRef?.current?.submit();
  };

  // Expose API
  return {
    formRef,
    initialValues,
    setInitialValues,
    requestParams,
    setRequestParams,
    deleteParams,
    setDeleteParams,
    visible,
    setVisible,
    open,
    close,
    reset,
    setValues,
    getValues,
    getValue,
    submit,
  };
}
