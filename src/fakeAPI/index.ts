import jsonData from "./productOptionsData.json";

const fetchProductData = (): Promise<{ status: number; body: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        body: JSON.stringify(jsonData),
      });
    }, Math.floor(Math.random() * 5 + 1) * 1000);
  });
};

export default fetchProductData;
