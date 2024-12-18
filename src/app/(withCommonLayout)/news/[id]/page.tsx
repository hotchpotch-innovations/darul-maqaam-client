import React from "react";

type TProps = {
  params: Record<string, any>;
};

const NewsDetailsPage = async ({ params }: TProps) => {
  const id = params?.id;
  return (
    <div>
      <p>ID : {id}</p>
    </div>
  );
};

export default NewsDetailsPage;
