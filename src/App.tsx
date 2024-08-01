import { useEffect } from "react";
import fetchProductData from "fakeAPI";
import "App.scss";

function App() {
  useEffect(() => {
    const getData = async (): Promise<any> => {
      const data = await fetchProductData();
      return data;
    };

    getData().then((data) => console.log("meow", data));
  }, []);

  return <div className="App"></div>;
}

export default App;
