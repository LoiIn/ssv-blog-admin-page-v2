import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";

import { useParams } from "react-router-dom";
import { showUser } from "./../../apis/user";

export default function DetailUser() {
  let { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadData = async () => {
      let { status, data } = await showUser(id);
      if (status === "success") setUser(data);
    };

    loadData();
  }, []);

  return (
    <div>
      <Row className="detail__area">
        <Col span={24}>
          <Card title={`User's Information`}>
            <Row>
              <Col span={14}>
                <table className="acc__table__info __table__info">
                  <tbody className="acc__basic__info __basic__info">
                    <tr>
                      <td>Name</td>
                      <th>{user.name}</th>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <th>{user.email}</th>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <th>{user.role}</th>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col span={10} className="acc__avatar">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrIBnP4Ppijsc0z3IRH6A6mQEs0OSaVlmFw&usqp=CAU"
                  }
                ></img>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
