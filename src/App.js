import React from "react";
import { DateTime } from "luxon";
import { sum } from "lodash";
import * as intl from "intl";
import * as intlComplete from "intl/dist/Intl.complete";

const prefetchStorage = window.prefetchStorage ?? {};

const myfetch = async (url) => {
  if (prefetchStorage[url]) {
    console.log("cache hit: " + url);
    return await prefetchStorage[url];
  } else {
    const json = await (await fetch(url)).json();
    return json;
  }
};

const Product = ({ id }) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    (async () => {
      setData(
        await myfetch(
          `https://63da01a2b28a3148f67cef79.mockapi.io/products/${id}/`
        )
      );
    })();
  }, [id]);

  return (
    <div>
      <div>ProductName: {data?.name}</div>
      <img src={data?.avatar} style={{ width: "100px", height: "100px" }} />
    </div>
  );
};

export default function App() {
  const neverBeCalled = () => {
    DateTime.local();

    sum([1, 2, 3]);
  };

  const id = React.useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("product_id");
  }, []);

  if (!id) {
    alert("?product_id=1 등의 주소로 접속해주세요.");
  }

  return (
    <div>
      <Product id={id} />
      <Product id={+id + 1} />
    </div>
  );
}
