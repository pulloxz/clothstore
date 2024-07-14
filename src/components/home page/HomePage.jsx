import Footer from "./Footer"
import { MicSVG, RightArrowSVG, SearchSVG } from "./icons"
import { NavBar, Categories, Card, Deal } from "./index"
import NewArrival from "./NewArrival";
import { useEffect, useState } from "react";
import client from "../../api/axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import List from "./List";

const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        await client.get(`/banner/all`)
            .then(res => {
                setData(res.data.data);
            })
            .catch(e => console.log(e));

        setLoading(false);
    }


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    console.log(data);

    return (
        <div className="w-full h-auto montserrat flex flex-col items-center mx-auto bg-[#FDFDFD] mb-20">
            <div className="min-w-[24rem] max-w-sm p-4 flex flex-col gap-6">
                <NavBar />
                <div className="w-full flex justify-center relative mt-16">
                    <SearchSVG className=" absolute top-2/4 left-6 translate-x-[-50%] translate-y-[-50%]" />
                    <input type="text" placeholder="Search any Product.." className="bg-white w-full p-2 pl-10 rounded-md shadow-sm text-sm text-[#BBBBBB]" />
                    <MicSVG className=" absolute top-2/4 right-1 translate-x-[-50%] translate-y-[-50%]" />
                </div>
                <div className="w-full h-auto flex gap-2">
                    <Categories />
                </div>

                <div className="h-full flex flex-col gap-12 my-4">
                    {
                        data && data.map((v, i) => {
                            if (v.type == 'slider') {
                                return (
                                    loading ? <Skeleton /> : <Card banners={v.banners} />
                                )
                            } else if (v.type == 'banner') {
                                return (
                                    loading ? <Skeleton height={100} /> : <NewArrival title={v.title} description={v.description} />
                                );
                            } else if (v.type == 'deal') {
                                return (
                                    loading ? <Skeleton height={80} /> : <Deal endTime={v.end_date} />
                                )
                            } else if (v.type == 'list') {
                                return (
                                    loading ? <Skeleton height={100} /> : <List v={v} />
                                )
                            }
                        })}
                </div>


            </div>
            <div className="max-w-sm flex justify-center">
                <Footer path="home" />
            </div>
        </div>
    )
}

export default HomePage

