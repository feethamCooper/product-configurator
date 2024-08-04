import jsonData from "./productOptionsData.json";

const fakeApiFech = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        body: JSON.stringify(jsonData),
      });
    }, Math.floor(Math.random() * 2 + 1) * 1000);
  });
};

export default fakeApiFech;
