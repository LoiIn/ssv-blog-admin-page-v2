import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";

import { useParams } from "react-router-dom";
import { showContact } from "../../../apis/contact";

export default function DetailContact(){
    let { id } = useParams();
    const [contact, setContact] = useState({});

    useEffect(async () => {
        let _contact = await showContact(id);
        setContact(_contact);
    }, []);
        
    return (
        <div>
           <Row className="detail__area">
               <Col span={24}>
                  <Card title={contact.name}>
                    {/* profile */}
                  </Card>
               </Col>
           </Row>
        </div>
    )
}