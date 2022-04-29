import axios from "axios";

const Request = {
  GET: async (url, headers, body, setResult) => {
    return await axios
      .get(url, body, { headers: headers })
      .catch((err) => {
        if (err) {
          setResult(err.message);
        }
      })
      .then((res) => {
        if (res) {
          setResult(JSON.stringify(res.data));
        }
      });
  },
  POST: async (url, headers, body, setResult) => {
    return await axios
      .post(url, body, { headers: headers })
      .catch((err) => {
        if (err) {
          setResult(err.message);
        }
      })
      .then((res) => {
        if (res) {
          setResult(JSON.stringify(res.data));
        }
      });
  },
  DELETE: async (url, headers, body, setResult) => {
    return await axios
      .delete(url, body, { headers: headers })
      .catch((err) => {
        if (err) {
          setResult(err.message);
        }
      })
      .then((res) => {
        if (res) {
          setResult(JSON.stringify(res.data));
        }
      });
  },
  PUT: async (url, headers, body, setResult) => {
    return await axios
      .put(url, body, { headers: headers })
      .catch((err) => {
        if (err) {
          setResult(err.message);
        }
      })
      .then((res) => {
        if (res) {
          setResult(JSON.stringify(res.data));
        }
      });
  },
  PATCH: async (url, headers, body, setResult) => {
    return await axios
      .patch(url, body, { headers: headers })
      .catch((err) => {
        if (err) {
          setResult(err.message);
        }
      })
      .then((res) => {
        if (res) {
          setResult(JSON.stringify(res.data));
        }
      });
  }
};

export default Request;
