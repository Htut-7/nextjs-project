import fetchHandler from "./fetchHandler";

const API_URL = "http://localhost:3000/api";

export const api = {
  user: {
    getAll: () => fetchHandler(API_URL + "/users"),
    create: (data: {
      name: string;
      email: string;
      username: string;
      image: string;
    }) =>
      fetchHandler(API_URL + "/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getUsersbyId: (id: string) => fetchHandler(API_URL + "/users/" + id),

    getUsersbyEmail: (email: string) =>
      fetchHandler(API_URL + "/users/email", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    update: (
      id: string,
      data: { name?: string; email?: string; username?: string; image?: string }
    ) =>
      fetchHandler(API_URL + "/users/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string) =>
      fetchHandler(API_URL + "/users/" + id, {
        method: "DELETE",
      }),
  },

  account: {
    getAll: () => fetchHandler(API_URL + "/accounts"),
    create: (data: {
      userId: string;
      name: string;
      paassword: string;
      provider: string;
      providerAccountId: string;
      image?: string;
    }) =>
      fetchHandler(API_URL + "/accounts", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getAccountById: (id: string) => fetchHandler(API_URL + "/accounts/" + id),

    getAccountsbyProvider: (provider: string) =>
      fetchHandler(API_URL + "/accounts/provider", {
        method: "POST",
        body: JSON.stringify({ provider }),
      }),

    update: (
      id: string,
      data: {
        userId?: string;
        name?: string;
        paassword?: string;
        provider?: string;
        providerAccountId?: string;
        image?: string;
      }
    ) =>
      fetchHandler(API_URL + "/accounts/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: (id: string) =>
      fetchHandler(API_URL + "/accounts/" + id, {
        method: "DELETE",
      }),
  },

  auth: {
    oauthSignIn: ({
      provider,
      providerAccountId,
      user,
    }: {
      provider: string;
      providerAccountId: string;
      user: {
        name: string;
        username: string;
        email: string;
        image: string;
      };
    }) =>
      fetchHandler(API_URL + "/auth/signin-with-oauth", {
        method: "POST",
        body: JSON.stringify({ provider, providerAccountId, user }),
      }),
  },
};
