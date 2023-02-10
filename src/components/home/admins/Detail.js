import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";

import { useParams } from "react-router-dom";
import { showAdmin } from "../../../apis/admin";

export default function DetailAdmin(){
    let { id } = useParams();
    const [admin, setAdmin] = useState({});

    useEffect(async () => {
        let _admin = await showAdmin(id);
        setAdmin(_admin);
    }, []);
        
    return (
        <div>
           <Row className="detail__area">
               <Col span={24}>
                  <Card title={`Admin's Information`}>
                    <Row>
                            <Col span={14}>
                                <table className="acc__table__info __table__info">
                                    <tbody className="acc__basic__info __basic__info">
                                        <tr>
                                            <td>Name</td>
                                            <th>{admin.name}</th>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <th>{admin.email}</th>
                                        </tr>
                                        <tr>
                                            <td>Birthday</td>
                                            <th>{admin.birthday}</th>
                                        </tr>
                                        <tr>
                                            <td>Social Link</td>
                                            <th>{admin.social_link}</th>
                                        </tr>
                                        <tr>
                                            <td>Active</td>
                                            <th>{admin.is_active}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={10} className="acc__avatar">
                                <img src={admin.avatar !== null ? admin.avatar : "https://s3.amazonaws.com/hoorayapp/emp-user-profile/default.jpg" }></img>
                            </Col>
                        </Row>
                  </Card>
               </Col>
           </Row>
        </div>
    )
}