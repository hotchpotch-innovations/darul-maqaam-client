import React from "react";
type TProps = {
  params: Record<string, any>;
};

const DonationDetailsPage = ({ params }: TProps) => {
  const slug = params?.slug;
  return (
    <div>
      <p>Slug : {slug} </p>
    </div>
  );
};

export default DonationDetailsPage;
