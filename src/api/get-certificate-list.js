import { API_KEY, API_METHOD, API_URL } from "./api-utils";

export const getCertificateList = async (setCertsArr) => {

  const response = await fetch(API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ApiKey: API_KEY,
        MethodName: API_METHOD.OSGetGoodList,
      }),
    }
  );

  const data = await response.json();

  if (data.result === 0) {
    const filteredState = data.data.map((certData) => {
      return Object.keys(certData)
        .filter(key => !key.startsWith("REC"))
        .reduce((obj, key) => {
          obj[key] = certData[key];
          return obj;
        }, {});
    })
    setCertsArr(filteredState);
  } else {
    console.error("Error:", data.resultdescription);
  }
};