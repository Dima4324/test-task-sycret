import { API_URL, API_KEY, API_METHOD } from "./api-utils";

export const createSale = async (saleData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ApiKey: API_KEY,
        MethodName: API_METHOD.OSSale,
        ...saleData
      })
    });
  
    const result = await response.json();
    if (result.result === 0) {
      console.log("Sale completed:", result.data);
    } else {
      console.error("Error:", result.resultdescription);
    }
  };