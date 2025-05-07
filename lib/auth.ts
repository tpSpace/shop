import api from "@/lib/api/login";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // Expected: { token }
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/user");
  return response.data; // Expected: User object
};
