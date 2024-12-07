"use client";

import CMMultipleTwoFieldInput from "@/components/forms/multiple_fields/CMMultipleTwoFieldInput";
import { useState } from "react";

const CreateBranchForm = () => {
  type TGetUs = {
    label: string;
    url: string;
  };
  const [getUs, setGetUs] = useState();
  return (
    <div>
      <CMMultipleTwoFieldInput
        label="Get us links"
        firstFieldName="label"
        secondFieldName="url"
        states={getUs}
        setStates={setGetUs}
      />
    </div>
  );
};

export default CreateBranchForm;
