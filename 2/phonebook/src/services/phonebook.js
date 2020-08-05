import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newResource) => {
  const request = axios.post(baseUrl, newResource);
  return request.then((response) => response.data);
};

const update = (id, newResource) => {
  const request = axios.put(`${baseUrl}/${id}`, newResource);
  return request.then((response) => response.data);
};

const deleteResource = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => getAll())
}


export default { getAll, create, update , deleteResource };
