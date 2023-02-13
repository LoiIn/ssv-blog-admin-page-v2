import React from "react";
import { Col, Card } from "antd";

export default function TopPost(props) {
  return (
    <Col span={6} className="gutter-row topPost">
      <Card title={props.title} style={{ minHeight: 300 }}>
        <p>{props.content}</p>
      </Card>
    </Col>
  );
}
