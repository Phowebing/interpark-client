/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../styles/ticket.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Ticket = () => {
  const swiperRef = useRef();

  const [htmlTag, setHtmlTag] = useState([]);

  const axiosGetData = function () {
    axios
      .get("ticket.json")
      .then(function (res) {
        console.log(res.data);
        let arr = [];
        for (let i = 0; i < res.data.total; i++) {
          const obj = res.data["ticket_" + (i + 1)];
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

  return (
    <section className="ticket">
      <div className="ticket-inner">
        <div className="ticket-header">
          <h2 className="ticket-title">티켓 랭킹</h2>
          <span className="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
        </div>
        <div className="ticket-main">
          <div className="ticket-category">
            <ul className="ticket-list">
              <li>
                <button className="ticket-cate-bt ticket-cate-bt-active">
                  뮤지컬
                </button>
              </li>
              <li>
                <button className="ticket-cate-bt">콘서트</button>
              </li>
              <li>
                <button className="ticket-cate-bt">스포츠</button>
              </li>
              <li>
                <button className="ticket-cate-bt">전시/행사</button>
              </li>
              <li>
                <button className="ticket-cate-bt">클래식/무용</button>
              </li>
              <li>
                <button className="ticket-cate-bt">아동/가족</button>
              </li>
              <li>
                <button className="ticket-cate-bt">연극</button>
              </li>
              <li>
                <button className="ticket-cate-bt">레저/캠핑</button>
              </li>
            </ul>
          </div>
          {/* <!-- 티켓 슬라이드 영역 --> */}
          <div className="ticket-slide-wrap">
            {/* <!-- Swiper --> */}
            <Swiper
              slidesPerView={4}
              spaceBetween={27}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".ticket-slide-wrap .slide-next-bt",
                prevEl: ".ticket-slide-wrap .slide-prev-bt",
              }}
              className="ticket-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="ticket-slide-item">
                      <a href={item.url} className="ticket-link">
                        <div className="ticket-img">
                          <img src={item.image} alt={item.tname} />
                        </div>
                        <div className="ticket-info">
                          <ul>
                            <li>
                              <b className="ticket-info-title">{item.tname}</b>
                            </li>
                            <li>
                              <p className="ticket-info-place">{item.place}</p>
                            </li>
                            <li>
                              <p className="ticket-info-duration">
                                {item.duration}
                              </p>
                            </li>
                            <li>
                              {item.seat === "단독판매" ? (
                                <button className="ticket-info-bt-red">
                                  <i>{item.seat}</i>
                                </button>
                              ) : (
                                ""
                              )}
                              {item.seat === "좌석우위" ? (
                                <button className="ticket-info-bt">
                                  {" "}
                                  <i>{item.seat}</i>{" "}
                                </button>
                              ) : (
                                ""
                              )}
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
        </div>
        <div className="ticket-footer">
          <a className="ticket-footer-more" href="#">
            티켓 홈 바로가기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
