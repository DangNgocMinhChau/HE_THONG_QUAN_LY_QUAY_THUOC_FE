import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actTinTuc from "../../../actions/quanlytintuc/actQuanLyTinTuc";
import parse from "html-react-parser";
import Slider from "react-slick";
import { Row, Col, Button } from "antd";

export default function Tintuc(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "50px",
  };

  const products = [
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
    {
      img: "https://suckhoedoisong.qltns.mediacdn.vn/Images/anhvan/2021/05/17/xet%20nghiem%20covid-19.jpg",
      title:
        "UBND TP.HCM ban hành chỉ thị khẩn: Giãn cách xã hội triệt để tại 312 xã phường",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actTinTuc.actFetchTinTucRequest());
  }, []);

  const { tinTuc } = useSelector(
    (state) => ({
      tinTuc: state.quanlytintuc.list,
    }),
    shallowEqual
  );

  const renderTintuc = (tinTuc) => {
    return tinTuc.map((item, index) => {
      return <p>{parse(item.noiDung)}</p>;
    });
  };
  return (
    <>
      <div className="banner">
        <iframe
          src="https://s0.2mdn.net/sadbundle/5198175209927999488/KV1--1160x250_nutifood.html"
          width="1160"
          height="256"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <div className="row">
        <div className="title-tintuc-noibat">
          <h4>TIN TỨC Y TẾ HÔM NAY :</h4>
        </div>
        <div className="col-xl-8 col-lg-4 col-md-6 col-sm-12 col-12 first-tintuc-1">
          <div className="img-tintuc-first">
            <img
              src="https://ksbtdanang.vn/uploads/news/2020_08/b52cd2aba2ec6360_71e23a3b20886ba4_7402415850530577185710.jpg"
              width="70%"
              height="280px"
            />
          </div>
          <div className="title-banner-tintuc">
            <strong>
              CÁC ĐỊA PHƯƠNG PHẢI NÂNG MỨC ĐỘ CẢNH GIÁC CAO NHẤT TRONG PHÒNG
              CHỐNG DỊCH COVID-19
            </strong>
            <p>
              Đây là nhấn mạnh của GS.TS Nguyễn Thanh Long – Quyền Bộ trưởng Bộ
              Y tế khi chủ trì buổi giao ban trực tuyến về công tác phòng chống
              dịch với lãnh đạo Sở Y tế các địa phương trong cả nước chiều ngày
              19/8...
            </p>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <p style={{ marginTop: "10px" }}>
              Trước tình trạng nhiều người rao bán bộ kit test nhanh COVID-19
              không rõ nguồn gốc trên mạng xã hội và các website/ứng dụng thương
              mại điện tử, Bộ Y tế đề nghị các cơ quan chức năng cùng vào cuộc
              để kiểm tra, đồng thời cảnh báo người tiêu dùng cần cẩn trọng khi
              mua hàng…
            </p>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <p style={{ marginTop: "10px" }}>
              Trước tình trạng nhiều người rao bán bộ kit test nhanh COVID-19
              không rõ nguồn gốc trên mạng xã hội và các website/ứng dụng thương
              mại điện tử, Bộ Y tế đề nghị các cơ quan chức năng cùng vào cuộc
              để kiểm tra, đồng thời cảnh báo người tiêu dùng cần cẩn trọng khi
              mua hàng…
            </p>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <p style={{ marginTop: "10px" }}>
              Trước tình trạng nhiều người rao bán bộ kit test nhanh COVID-19
              không rõ nguồn gốc trên mạng xã hội và các website/ứng dụng thương
              mại điện tử, Bộ Y tế đề nghị các cơ quan chức năng cùng vào cuộc
              để kiểm tra, đồng thời cảnh báo người tiêu dùng cần cẩn trọng khi
              mua hàng…
            </p>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <p style={{ marginTop: "10px" }}>
              Trước tình trạng nhiều người rao bán bộ kit test nhanh COVID-19
              không rõ nguồn gốc trên mạng xã hội và các website/ứng dụng thương
              mại điện tử, Bộ Y tế đề nghị các cơ quan chức năng cùng vào cuộc
              để kiểm tra, đồng thời cảnh báo người tiêu dùng cần cẩn trọng khi
              mua hàng…
            </p>
          </div>
        </div>
        <div className="tintuc-dangchuy">
          <h4>ĐÁNG CHÚ Ý :</h4>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb2">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb2">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb2">
          <div className="img-tintuc-banner">
            <img src="http://baochinhphu.vn/Uploaded/phungthithuhuyen/2021_08_04/test.jpg" />
          </div>
          <div className="title-banner-tictuc">
            <strong>
              Khuyến cáo người tiêu dùng khi mua kit test nhanh kháng nguyên
              SARS-CoV-2
            </strong>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
            <div className="dangchuy-tintucle">
              <div className="dangchuy-tintucle-img">
                <img src="https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_07_02/ttxvn_tu_lanh_cong_dong_1.jpeg" />
              </div>
              <div className="dangchuy-tintucle-title">
                <strong>
                  Mở tủ lạnh toàn món ngon Việt trong thời giãn cách xã hội
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="title-tintuc-noibat">
          <h4 style={{ marginTop: "50px" }}>CÓ THỂ BẠN CHƯA XEM :</h4>
        </div>
      </div>
      <div className="col-xl-12">
        {/* <div className="col-xl-8 col-lg-4 col-md-6 col-sm-12 col-12 "> */}
        <Row>
          <Col span={17}>
            <div className="carousel-img">
              <Slider {...settings}>
                {products.map((item, index) => {
                  return (
                    <div key={index} className="img-card-tintuc">
                      <img className="img1" src={item.img} />
                      <div className="card-body-tintuc">
                        <div className="card-title-tintuc">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="cactin-lienquan">
              <div className="cactin-lienquan-image">
                <img src="https://kenh14cdn.com/zoom/280_175/203336854389633024/2021/8/22/photo1629644104294-16296441045311114969356.jpg" />
              </div>
              <div className="cactin-lienquan-title">
                <p>[ Tin vừa lên ]</p>
                <strong>
                  Các ca Covid-19 mới đến 23 địa điểm dưới đây, Đà Nẵng yêu cầu
                  người dân khai báo khẩn
                </strong>
                <p>
                  Chiều 22/8, TP.HCM ban hành Công văn 2800 điều chỉnh, bổ sung
                  một số nội dung về các nhóm đối tượng được phép lưu thông ...
                </p>
                <div className="chitiet-tintuc">
                  <Button
                    style={{
                      border: "none",
                      color: "#3b5998",
                      fontSize: "20px",
                    }}
                  >
                    Xem thêm{" >> "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="cactin-lienquan">
              <div className="cactin-lienquan-image">
                <img src="https://kenh14cdn.com/zoom/280_175/203336854389633024/2021/8/22/photo1629644104294-16296441045311114969356.jpg" />
              </div>
              <div className="cactin-lienquan-title">
                <p>[ Tin vừa lên ]</p>
                <strong>
                  Các ca Covid-19 mới đến 23 địa điểm dưới đây, Đà Nẵng yêu cầu
                  người dân khai báo khẩn
                </strong>
                <p>
                  Chiều 22/8, TP.HCM ban hành Công văn 2800 điều chỉnh, bổ sung
                  một số nội dung về các nhóm đối tượng được phép lưu thông ...
                </p>
                <div className="chitiet-tintuc">
                  <Button
                    style={{
                      border: "none",
                      color: "#3b5998",
                      fontSize: "20px",
                    }}
                  >
                    Xem thêm{" >> "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="cactin-lienquan">
              <div className="cactin-lienquan-image">
                <img src="https://kenh14cdn.com/zoom/280_175/203336854389633024/2021/8/22/photo1629644104294-16296441045311114969356.jpg" />
              </div>
              <div className="cactin-lienquan-title">
                <p>[ Tin vừa lên ]</p>
                <strong>
                  Các ca Covid-19 mới đến 23 địa điểm dưới đây, Đà Nẵng yêu cầu
                  người dân khai báo khẩn
                </strong>
                <p>
                  Chiều 22/8, TP.HCM ban hành Công văn 2800 điều chỉnh, bổ sung
                  một số nội dung về các nhóm đối tượng được phép lưu thông ...
                </p>
                <div className="chitiet-tintuc">
                  <Button
                    style={{
                      border: "none",
                      color: "#3b5998",
                      fontSize: "20px",
                    }}
                  >
                    Xem thêm{" >> "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="cactin-lienquan">
              <div className="cactin-lienquan-image">
                <img src="https://kenh14cdn.com/thumb_w/250/203336854389633024/2021/8/22/photo1629587391838-16295873919972061914531.jpg" />
              </div>
              <div className="cactin-lienquan-title">
                <strong>
                  Diễn biến dịch ngày 22&frasl;8: Thêm 7.580 bệnh nhân COVID-19
                  được chữa khỏi trên cả nước; số ca mắc tại Hà Nội giảm mạnh so
                  với các ngày trước
                </strong>
                <p style={{ paddingTop: "10px", fontSize: "13px" }}>
                  Bản tin COVID-19 ngày 22/8 của Bộ Y tế cho biết cả nước có
                  7.580 bệnh nhân đã khỏi bệnh, 8 tỉnh thành trong 14 ngày không
                  ghi nhận ca nhiễm mới.
                </p>
                <div className="readmore-tintuc"></div>
                <div className="docthem-tintuc-today">
                  <span>Đọc thêm</span>
                  <ul>
                    <li>
                      Diễn biến dịch ngày 21&frasl;8: Thêm 7.272 bệnh nhân
                      COVID-19 khỏi bệnh; Người dân TP.HCM đi chợ, nhận thực
                      phẩm ra sao từ 0h ngày 23&frasl;8?
                    </li>
                    <li>
                      Diễn biến dịch ngày 20&frasl;8: Người dân TP.HCM không tự
                      đi chợ, lương thực được phát tận nhà; Hà Nội tiếp tục giãn
                      cách xã hội đến 6h ngày 6&frasl;9
                    </li>
                    <li>
                      Diễn biến dịch ngày 19&frasl;8: Khoảng 20 triệu liều vắc
                      xin Covid-19 về Việt Nam trong tháng 8 và 9; Đã có mất mát
                      với y bác sĩ tuyến đầu
                    </li>
                  </ul>
                </div>
                <div className="chitiet-tintuc">
                  <Button
                    style={{
                      border: "none",
                      color: "#3b5998",
                      fontSize: "20px",
                    }}
                  >
                    Xem thêm{" >> "}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col span={1}></Col>
          {/* </div> */}
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"> */}
          <Col span={6}>
            <div className="quangcao-tintuc">
              <iframe
                src="https://cdnstoremedia.com/adt/amt/2021/07/300x6-amt60f9324677a41.html?url=%2F%2Flg1.logging.admicro.vn%2Fadmt%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3D70b9bd0d-d370-4f7e-8c62-e8a78fa419d1115-61224084%26ctr%3D0.37109292166758556%26sspr%3D1.9568%26lsn%3D1629634691975%26ce%3D1%26lc%3D31%26cr%3D1626687838%26ui%3D8166878381963322121%26uuid%3D2b5f71b6d41825d7ae7de1564a0d7b1c%26bi%3D0%26cmpg%3D25578%26items%3D80888%26zid%3D485036%26pr%3D8177561872%26cid%3D-1%26pt%3Dadmt%26tp%3D12%26tpn%3D4%26sspz%3D2343%26cov%3D1%26re%3Dhttps%253A%252F%252Fbs.serving-sys.com%252FServing%252FadServer.bs%253Fcn%253Dtrd%2526pli%253D1076874267%2526adid%253D1084230821%2526ord%253D0.4436692330567089&vast=%2F%2Fcdnstoremedia.com%2Fadt%2Fcpc%2Fcpm7k%2Fvastfile%2F80888.xml%3Ft%3D923239&admid=adnzone_485036_0_80888&temp=30&loc=31&weath=1"
                width="300px"
                height="600"
                frameBorder="0"
                scrolling="no"
              />
            </div>
            <div className="quangcao-tintuc">
              <iframe
                src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/hocdo/2021_07_16/300x600_t7_48/300x600_t7_48/300x600_t7_48.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3Dbb2b1a85-0511-4a4d-bf5b-ad76ded5d401115-61226c99%26ctr%3D0.1745546906022355%26sspb%3D7544%26sspr%3D0.0752%26lsn%3D1629645976701%26ce%3D1%26lc%3D31%26cr%3D1626687838%26ui%3D8166878381963322121%26uuid%3D2b5f71b6d41825d7ae7de1564a0d7b1c%26bi%3D0%26cmpg%3D59658%26items%3D248554%26zid%3D9986%26pr%3D24873023402%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D10%26sspz%3D2035%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Faquavietnam.com.vn%252Fbao-hanh-dong-co-tron-doi%252F%253Futm_source%253DUnicorn%2526utm_medium%253DAdmicro%252BADX%252BPC%2526utm_campaign%253DAQUA%252BWARRANTY%252B2021&admid=adnzone_9986_0_248554&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dkenh14.vn%252F%26z%3D9986%26p%3D1%26w%3D650%26h%3D300%26lsn%3De22cd395979f433ab17deb93653e40b8%26dgid%3D86fc81c22f5b686a638bd8f5fa79e805%26l%3D31%26loc%3D31%26i%3D8166878381963322121%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D248554"
                width="300px"
                height="600"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* </div> */}
      {/* {renderTintuc(tinTuc)} */}
    </>
  );
}
