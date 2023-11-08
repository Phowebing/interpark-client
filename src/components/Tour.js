/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../styles/tour.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Tour = () => {
  // js 코드
  // JSX 의 요소를 React 에서 참조
  const swiperRef = useRef();
  const [htmlTag, setHtmlTag] = useState([]);

  const axiosGetData = function () {
    axios
      .get("tour.json")
      .then(function (res) {
        console.log(res.data);
        let arr = [];
        for (let i = 0; i < res.data.total; i++) {
          const obj = res.data["tour_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(function () {
    // 외부 데이터 불러들이기
    // getJsonData();
    axiosGetData();
  }, []);

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="tour">
      <div className="tour-inner">
        <div className="tour-header">
          <h2 className="tour-title">투어 특가</h2>
          <span className="tour-txt">해외여행은 인터파크다</span>
        </div>

        <div className="tour-main">
          <div className="tour-category">
            <ul className="tour-list">
              <li>
                <button className="tour-cate-bt tour-cate-bt-active">
                  망설이면 품절
                </button>
              </li>
              <li>
                <button className="tour-cate-bt">패키지</button>
              </li>
              <li>
                <button className="tour-cate-bt">국내여행</button>
              </li>
              <li>
                <button className="tour-cate-bt">해외여행</button>
              </li>
            </ul>
          </div>
          {/* <!-- 투어 상품 슬라이드 --> */}
          <div className="tour-slide-wrap">
            <Swiper
              slidesPerView={3}
              spaceBetween={27}
              slidesPerGroup={3}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tour-slide-wrap .slide-next-bt",
                prevEl: ".tour-slide-wrap .slide-prev-bt",
              }}
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="tour-slide-item">
                      <a href={item.url} className="tour-link">
                        <div className="tour-img">
                          <img src={item.image} alt={item.desc} />
                        </div>
                        <div className="tour-info">
                          <div className="tour-badge">
                            <i>{item.badge}</i>
                          </div>
                          <ul className="tour-good-list">
                            <li>
                              <span className="tour-benefit">
                                {item.tour_title}
                              </span>
                            </li>
                            <li>
                              <p className="tour-item-name">{item.desc}</p>
                            </li>
                            <li>
                              <span className="tour-info-won">
                                <b>{numberWithCommas(item.price)}</b>원~
                              </span>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
          {/* <!-- Swiper --> */}
        </div>
        <div className="tour-footer">
          <a className="category-more" href="#">
            투어 홈 바로가기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Tour;
