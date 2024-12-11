type TData = {
  token: any;
  id: any;
  password: any;
};

export const resetPassword = async (data: TData) => {
  const { token, ...payload } = data;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
      credentials: "include",
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};
