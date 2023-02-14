import React from "react";
import { Card, Row, Col } from "antd";

export default function Page404() {
  return (
    <div>
      <Row className="error__page">
        <Col span={12} offset={6}>
          <Card
            className="err__404"
            title="404! Page not found"
            bordered={false}
          >
            This page is unknow or does not exist!
          </Card>
        </Col>
      </Row>
    </div>
  );
}
