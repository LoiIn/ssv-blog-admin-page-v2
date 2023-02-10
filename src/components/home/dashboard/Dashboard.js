import React, { useEffect, useState } from "react";
import {
  rankPost,
  countPostsByAgent,
  getReactsInYear,
  getCmtsInYear,
} from "../../../apis/dashboard";
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";

import { Row, Col, Button, Space } from "antd";

import AdminPost from "./AdminPost";
import TopPost from "./TopPost";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";

Highcharts.setOptions({ accessibility: { enabled: false } });
variablePie(Highcharts);
const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("like");
  const [pieData, setPieData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    async function fetchRankPost() {
      let { status, data } = await rankPost(type);
      if (status === "success") setPosts(data);
    }

    fetchRankPost();
  }, [type]);

  useEffect(() => {
    const fetchCategories = async () => {
      let { status, data } = await countPostsByAgent("category");
      if (status !== "fail") {
        let newData = data.map((cate) => {
          return {
            name: cate.name,
            x: cate.postCounts,
            y: cate.postCounts,
          };
        });
        setPieData(newData);
      }
    };

    const fetchLikeData = async () => {
      let res = await getReactsInYear("likes", "2021");
      if (res !== "fail") {
        setLikeData(res);
      }
    };

    const fetchCommentData = async () => {
      let res = await getCmtsInYear("comments", "2021");
      if (res !== "fail") {
        setCommentData(res);
      }
    };

    const fetchAdmin = async () => {
      let { status, data } = await countPostsByAgent("admin");
      if (status !== "fail") {
        setAdminData(data);
      }
    };

    fetchCategories();
    fetchLikeData();
    fetchCommentData();
    fetchAdmin();
  }, []);

  const optionsPieChart = {
    chart: {
      type: "variablepie",
      height: "200px",
    },
    title: {
      text: null,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
        "Number of post: <b>{point.y}</b><br/>",
    },
    series: [
      {
        minPointSize: 30,
        innerSize: "70%",
        zMin: 0,
        name: "posts by categories",
        data: pieData,
      },
    ],
  };

  const optionsLineChart = {
    chart: {
      type: "spline",
      height: "300px",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        name: "Likes",
        data: likeData,
        color: "red",
      },
      {
        name: "Comments",
        data: commentData,
        color: "green",
      },
    ],
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    title: {
      text: null,
    },
  };

  return (
    <div className="dashboard">
      <Row className="dashboard__row">
        {/* <Col span={17}>
          <div className="dashboard__heading">Post's Reactions</div>
          <HighchartsReact highcharts={Highcharts} options={optionsLineChart} />
        </Col> */}
        <Col md={17}>
          <div className="dashboard__heading">Posts By Category</div>
          <HighchartsReact highcharts={Highcharts} options={optionsPieChart} />
        </Col>
        <Col span={6} offset={1}>
          <div className="dashboard__heading">Admin's Post</div>
          {adminData.map((item) => {
            return (
              <AdminPost
                name={item.name}
                number={item.postCounts}
                key={item.name}
              />
            );
          })}
        </Col>
      </Row>
      <Row className="dashboard__row">
        <Col md={24}>
          <Row>
            <Col className="dashboard__heading">Top Posts</Col>
            <Col offset={1}>
              <Space>
                <Button
                  onClick={() => {
                    setType("like");
                  }}
                >
                  By <LikeOutlined />
                </Button>
                <Button
                  onClick={() => {
                    setType("comment");
                  }}
                >
                  By <CommentOutlined />
                </Button>
              </Space>
            </Col>
          </Row>
          <Row className="topPosts" gutter={18}>
            {posts &&
              posts.map((post) => {
                return (
                  <TopPost
                    key={post._id}
                    title={post.title}
                    content={post.summary}
                  />
                );
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
