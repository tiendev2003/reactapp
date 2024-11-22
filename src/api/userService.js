import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from "axios";
import { baseUrl } from "./config";

export async function createAccountService(
  firstName,
  lastName,
  email,
  password
) {
  return await axios.post(`${baseUrl}/auth/register`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
}

export async function loginAccountService(email, password) {
  return await axios.post(`${baseUrl}/auth/login`, {
    email: email,
    password: password,
  });
}

export async function validateTokenService(token) {
  const localToken = localStorage.getItem('token');
  return await axios.get(`${baseUrl}/auth/validateToken`, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}

export async function sendVerificationSecurityCode(email) {
  return await axios.post(
    `${baseUrl}/auth/send-verification-email?email=${email}`
  );
}

export async function sendVerificationSecurityCodeForFP(email) {
  return await axios.post(
    `${baseUrl}/auth/forgot-password/send-verification-email?email=${email}`
  );
}

export async function resetPassword(email, password) {
  return await axios.put(
    `${baseUrl}/auth/new-password?email=${email}&password=${password}`
  );
}

export async function verifySecurityCode(email, otp) {
  return await axios.post(
    `${baseUrl}/auth/verify-security-code?email=${email}&otp=${otp}`
  );
}

// edit name
export async function editNameService(token, firstName, lastName) {
   const localToken = localStorage.getItem('token');

  return await axios.post(
    `${baseUrl}/profile/name`,
    {
      firstName: firstName,
      lastName: lastName,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// edit email
export async function editEmailService(token, inemail) {
  const localToken = localStorage.getItem('token');

  return await axios.post(
    `${baseUrl}/profile/email`,
    {
      email: inemail,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// edit password
export async function editPasswordService(token, oldPassword, password) {
  const localToken = localStorage.getItem('token');

  return await axios.put(
    `${baseUrl}/profile/password`,
    {
      oldPassword: oldPassword,
      password: password,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// edit image
export async function editImageService(token, image) {
  const localToken = localStorage.getItem('token');

  return await axios.post(
    `${baseUrl}/profile/image`,
    {
      image: image,
    },
    {
      headers: {
        Authorization: `Bearer ${localToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token =  localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: "/profile",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

// export react hook
export const { useGetUserDetailsQuery } = authApi;
