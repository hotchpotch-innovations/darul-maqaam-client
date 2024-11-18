"use server";

export const registerClient = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-client
`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );
  const clientInfo = await res.json();
  return clientInfo;
};
