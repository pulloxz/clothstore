import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import { BackArrow } from "./icons";
import { Rating } from "../home page/icons";
import { useEffect, useState } from "react";
import client from "../../api/axios";
import { motion } from "framer-motion";
import { useRelated } from "../../provider/zustand";
import Skeleton from "react-loading-skeleton";
import LoadingSkeleton from "../LoadingSkeleton";
import backicon from '../../assets/back.svg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Header from "../headerComp";


const TrendingProducts = () => {
    const navigator = useNavigate();
    const { state } = useLocation();
    const [data, setData] = useState([]);
    const { setItems } = useRelated();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.post('/product/specificproductids', { id: state.id });
                setData(response.data.data);
                setItems(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (state && state.id) {
            fetchData();
        }
    }, [state]);

    const preprocessData = (data) => {
        const leftAlign = [];
        const rightAlign = [];
        data.forEach((item, index) => {
            if (index % 5 === 0 || index % 5 === 3 || index % 5 === 4) {
                leftAlign.push(item);
            } else {
                rightAlign.push(item);
            }
        });
        return { leftAlign, rightAlign };
    };

    const { leftAlign, rightAlign } = preprocessData(data);

    const routeVariants = {
        initial: {
            y: '1vh'
        },
        final: {
            y: '0vh'
        }
    };

    const transition = {
        duration: 1,
        ease: [0.43, 0.3, 0.23, 0.96]
    };

    return (
        <motion.div variants={routeVariants} initial="initial" animate="final" transition={transition}>
            <div className="w-full flex flex-col mx-auto">
                <Container>
                    <Header title={state.title}/>
                </Container>

                <Container>
                    <div className="w-full grid grid-cols-2 justify-between items-start gap-3 px-4 py-6">
                        <div>
                            {loading ? <LoadingSkeleton />
                                :
                                leftAlign.map((v) => (
                                    <Link to={`/shop/${v.id}`} key={v.id}>
                                        <div className="w-full min-h-[245px] h-auto rounded-lg mb-3 shadow-md">
                                            <LazyLoadImage
                                                className="w-full h-[140px] rounded-lg object-cover"
                                                effect="blur"
                                                src={v.img[0].src}
                                                width="100%"
                                            />
                                            <div className="w-full flex flex-col gap-0.5 mx-2">
                                                <p className="font-medium text-base text-[10px]">{v.name}</p>
                                                <p className="font-normal text-[10px]">{v.description}</p>
                                                <p className="font-medium text-xs pt-0.5">{v.price}</p>
                                                <div className="w-full flex items-center gap-2 mb-1.5">
                                                    <Rating />
                                                    <p className="font-normal text-[10px]">{Math.floor(v.rating)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                        <div>
                            {loading ? <LoadingSkeleton height={250} />
                                :
                                rightAlign.map((v) => (
                                    <Link to={`/shop/${v.id}`} key={v.id}>
                                        <div className="w-full min-h-[305px] h-auto rounded-lg mb-3 shadow-md">
                                            <LazyLoadImage
                                                className="w-full h-[196px] rounded-lg object-cover"
                                                effect="blur"
                                                src={v.img[0].src}
                                                width="100%"
                                            />
                                            <div className="w-full flex flex-col gap-0.5 mx-2">
                                                <p className="font-medium text-base text-[10px]">{v.name}</p>
                                                <p className="font-normal text-[10px]">{v.description}</p>
                                                <p className="font-medium text-xs pt-0.5">{v.price}</p>
                                                <div className="w-full flex items-center gap-2 mb-1.5">
                                                    <Rating />
                                                    <p className="font-normal text-[10px]">{Math.floor(v.rating)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </Container>
            </div>
        </motion.div>
    );
};

export default TrendingProducts;
