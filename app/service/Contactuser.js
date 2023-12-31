import { httpAxios } from "../httpAxios";

export async function contactuserService(name,email,message) {
  const result = await httpAxios
    .post("api/contactUser",{name:name,email:email,message:message})
    .then((response) => response.data);
  return result;
}
