import { Col, Row } from "antd";
import { useEffect } from "react";

function Carousel_ads() {
  return (
    <>
      <div className="container">
        <Row style={{ marginTop: "5px" }}>
          <Col span={17}>
            <div
              id="carouselExampleSlidesOnly"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src="https://www.fda.gov/files/Final%20art%20031921_VIETNAMESE.png"
                    class="d-block w-100"
                    alt="photo"
                    width="100%"
                    height="350px"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://youthvietnam.vn/wp-content/uploads/2021/05/Banner-quang-cao-san-pham-online.jpg"
                    class="d-block w-100"
                    alt="photo"
                    width="100%"
                    height="350px"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://viettamduc.com/wp-content/uploads/2018/08/Sp-hoc-vien-hoc-do-hoa-789-my-dinh4.jpg"
                    class="d-block w-100"
                    alt="photo"
                    width="100%"
                    height="350px"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col span={1}></Col>

          <Col span={6}>
            <div
              className="banner-right"
              style={{ width: "100%", height: "350px" }}
            >
              <img
                src="https://free.vector6.com/wp-content/uploads/2020/04/Corona-qbvngz0060.jpg"
                class="d-block w-100"
                alt="photo"
                width="100%"
                height="350px"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Carousel_ads;
