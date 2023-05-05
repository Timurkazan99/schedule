import React from 'react';
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const DownloadFooter = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'modal'});

  return (
    <>
      <Button
        type="submit"
        form="activeForm"
      >
        {t('download')}
      </Button>
    </>
  );
};

export default DownloadFooter;