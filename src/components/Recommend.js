/* eslint-disable jsx-a11y/anchor-has-content */
import { BtCate, BtHome } from "../components/ui/buttons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "../styles/recommend.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { InnerArea, SectionTag } from "./layout/layout";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Recommend = () => {
  // js 코드 자리
  // JSX 의 요소를 React 에서 참조
  const swiperRef = useRef();
  // json 데이터 저장해 두고, 자료가 바뀌면 화면을 변경할
  // 리액트 변수를 만든다.
  const [htmlTag, setHtmlTag] = useState([]);

  // 외부데이터 연동하기 (axios 이용)
  const axiosGetData = function () {
    axios
      .get("recommend.json")
      .then(function (res) {
        console.log(res.data);
        let arr = [];
        for (let i = 0; i < res.data.total; i++) {
          const obj = res.data["good_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 외부데이터 연동하기 (fetch 이용)
  const getJsonData = () => {
    fetch("recommend.json")
      .then((response) => {
        // 자료가 불러들여 졌을 때
        return response.json();
      })
      .then((result) => {
        console.log("result:", result);
        // result를 원하는데로 처리하겠다.
        // 자료가 바뀌면 화면을 변경하는 기능을 생성하겠다.
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["good_" + (i + 1)];
          arr[i] = obj;
        }
        console.log(arr);
        setHtmlTag(arr);
      })
      .catch((error) => {
        console.log("error:", error);
        // 에러가 발생했다.
      });
  };

  // html 이 준비가 되면, json을 불러들이겠다.
  //1. 외부데이터를 불러올 때
  //2. html 태그 참조 (useRef 할 때)
  //3. window 참조할 때
  //4. window.addEventListner ("scroll"...)
  //5. cleanUp 할 때 : 컴포넌트 화면에서 사라질 때 실행할 함수
  //6. 타이머 만들고 제거할 때
  // 컴포넌트가 화면에 보여질 때 실행할 내용 기재 장소
  // use 는 Hook 이라고 합니다. 원하는 시접을 감시하고 실행할 함수
  useEffect(function () {
    // 외부 데이터 불러들이기
    // getJsonData();
    axiosGetData();
  }, []);

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <SectionTag pt={0} pb={90}>
      <InnerArea>
        <div className="recommend-header">
          <h2 className="recommend-title">쇼핑 추천</h2>
          <span className="recommend-txt">
            할인이 쎄다! 지금, 특가 상품을 확인하세요.
          </span>
        </div>

        <div className="recommend-main">
          <div className="recommend-category">
            <ul className="recommend-list">
              <li>
                <BtCate active={true}>쎈딜</BtCate>
              </li>
              <li>
                <BtCate>베스트</BtCate>
              </li>
              <li>
                <BtCate>블랙데이</BtCate>
              </li>
              <li>
                <BtCate>디지털프라자</BtCate>
              </li>
              <li>
                <a href="#" className="recommend-cate-bt">
                  소담상회
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- 추천 상품 슬라이드 --> */}
          <div className="recommend-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={27}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".recommend-slide-wrap .slide-next-bt",
                prevEl: ".recommend-slide-wrap .slide-prev-bt",
              }}
              className="recommend-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="recommend-slide-item">
                      <a href={item.url} className="recommend-link">
                        <div className="recommend-img">
                          <img src={item.image} alt={item.desc} />
                        </div>
                        <div className="recommend-info">
                          <ul className="recommend-good-list">
                            <li>
                              <span className="recommend-good-info-price">
                                <b>
                                  {item.discount === 0
                                    ? ""
                                    : item.discount + "%"}
                                </b>
                                <em>{numberWithCommas(item.price)}</em>원
                              </span>
                            </li>
                            <li>
                              <p className="recommend-good-info-desc">
                                {item.desc}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* <!-- Swiper --> */}
            {/* <!-- 좌,우 이동버튼 : 너무 자주 재활용 됨 -->
          <!-- 그래서 재활용 가능하도록 별도(common) css 작업 진행 --> */}
            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
          {/* <!-- //추천 상품 슬라이드 --> */}
        </div>

        <div className="recommend-footer">
          <a class="category-more" href="#">
            <span>쇼핑 홈 바로가기</span>
          </a>
        </div>
      </InnerArea>
    </SectionTag>
  );
};
export default Recommend;
