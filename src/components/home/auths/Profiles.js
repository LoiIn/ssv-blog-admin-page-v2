import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd"

import { getProfile } from "../../../apis/auth";
import { EditOutlined } from "@ant-design/icons";

import EditProfile from "./EditProfile";
import useHookAuth from "../../../hooks/auth";

export default function Profile(){
    const [modalVisible, setModalVisible] = useState(false);
    const [profiles, updateProfiles] = useHookAuth();

    const showModal = () => {
        setModalVisible(true);
    }
        
    return (
        <div>
            <EditProfile 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
                profiles = {profiles}
                onUpdate = {updateProfiles}
            />
           <Row className="detail__area">
               <Col span={24}>
                  <Card 
                    title={`My Information`}
                    extra = {<Button icon={<EditOutlined/>} onClick={showModal}>Edit</Button>}
                    >
                    <Row>
                            <Col span={14}>
                                <table className="acc__table__info __table__info">
                                    <tbody className="acc__basic__info __basic__info">
                                        <tr>
                                            <td>Name</td>
                                            <th>{profiles.name}</th>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <th>{profiles.email}</th>
                                        </tr>
                                        <tr>
                                            <td>Birthday</td>
                                            <th>{profiles.birthday}</th>
                                        </tr>
                                        <tr>
                                            <td>Social Link</td>
                                            <th>{profiles.social_link}</th>
                                        </tr>
                                        <tr>
                                            <td>Active</td>
                                            <th>{profiles.is_active}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={10} className="acc__avatar">
                                <img src={profiles.avatar !== null ? profiles.avatar : "https://s3.amazonaws.com/hoorayapp/emp-user-profile/default.jpg" }></img>
                            </Col>
                        </Row>
                  </Card>
               </Col>
           </Row>
        </div>
    )
}