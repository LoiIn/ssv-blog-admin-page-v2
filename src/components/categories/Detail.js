import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";

import { useParams } from "react-router-dom";
import { showCategory } from "./../../apis/category";

export default function DetailCategory() {
  let { id } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const loadData = async () => {
      let { status, data } = await showCategory(id);
      if (status === "success") setCategory(data);
    };

    loadData();
  }, []);

  return (
    <div>
      <Row className="detail__area">
        <Col span={24}>
          <Card title={`Category's Information`}>
            <Row>
              <table className="__table__info">
                <tbody className="__basic__info">
                  <tr>
                    <td>Title</td>
                    <th>{category.name}</th>
                  </tr>
                  <tr>
                    <td>Slug</td>
                    <th>{category.slug}</th>
                  </tr>
                </tbody>
              </table>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
