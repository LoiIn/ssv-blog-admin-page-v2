import React from "react";
import { Card, Row, Col } from "antd";

export default function Page500() {
  return (
    <div>
      <Row className="error-page">
        <Col span={12} offset={6}>
          <Card
            className="err__500"
            title="500! Server Error!"
            bordered={false}
          >
            Opps! something went wrong
          </Card>
        </Col>
      </Row>
    </div>
  );
}
