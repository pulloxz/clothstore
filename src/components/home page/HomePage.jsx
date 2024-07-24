import Footer from "./Footer";
import { MicSVG, SearchSVG } from "./icons";
import { NavBar, Categories, Card, Deal } from "./index";
import NewArrival from "./NewArrival";
import { useEffect, useState } from "react";
import client from "../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HomeSkeleton from "./HomeSkeleton";
import List from "./List";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await client.get(`/banner/all`);
      const sorted = res.data.data.sort((a, b) => a.priority > b.priority);
      setData(sorted);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full montserrat flex flex-col items-center mx-auto bg-[#FDFDFD] mt-2">
      <div className="min-w-[24rem] max-w-sm p- flex flex-col gap-3">
        <NavBar loading={loading} />
        <div className="w-full flex justify-center relative px-4 mt-16 mb-2">
          {loading ? (
            <Skeleton width={350} height={35} className="rounded-md" />
          ) : (
            <>
              <SearchSVG className="absolute top-2/4 left-10 translate-x-[-50%] translate-y-[-50%]" />
              <input
                type="text"
                placeholder="Search any Product.."
                className="bg-white w-full p-2 pl-12 rounded-md box-shadow text-sm text-[#BBBBBB]"
              />
              <MicSVG className="absolute top-2/4 right-7 translate-x-[-50%] translate-y-[-50%]" />
            </>
          )}
        </div>

        <Categories loading={loading} />

        <div className="h-full w-full flex flex-col justify-between category mb-24">
          {loading ? (
            <HomeSkeleton />
          ) : (
            data.map((v, i) => {
              if (v.type === "slider") {
                return <Card key={i} banners={v.banners} />;
              } else if (v.type === "banner") {
                return (
                  <NewArrival
                    key={i}
                    title={v.title}
                    description={v.description}
                  />
                );
              } else if (v.type === "deal") {
                return (
                  <Deal key={i} products={v.products_ids} endTime={v.end_date} />
                );
              } else if (v.type === "list") {
                return <List key={i} v={v} />;
              }
            })
          )}
        </div>
      </div>
      <div className="max-w-sm flex justify-center">
        {loading ? (
          <Skeleton height={60} width={350} />
        ) : (
          <Footer path="home" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
