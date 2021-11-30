import React from 'react'
import { Steps, Step } from "react-step-builder";
import UploadProd from './UploadProd';
import ShowProd from './ShowProd';

const MultiStepForm = () => {
  return (
    <Steps>
      <Step component={UploadProd} />
      <Step component={ShowProd} />
    </Steps>

  )
}

export default MultiStepForm;
