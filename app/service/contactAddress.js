import { httpAxios } from "../httpAxios";

export async function contactAddress(token,
  name,
  contactNo,
  city,
  state,
  pin,
  house,
  area
) {
  const result = await httpAxios
    .post("api/contactAddress", {
      token:token,
      name: name,
      city: city,
      house: house,
      state: state,
      pin: pin,
      area: area,
      contactNo: contactNo,
    })
    .then((response) => response);
  return result;
}

export async function getContactAddress(token) {
  const result = await httpAxios
    .post("api/get-contactAddress", { token })
    .then((response) => response.data);
  return result;
}
