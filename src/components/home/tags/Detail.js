import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";

import { useParams } from "react-router-dom";
import { showTag } from "../../../apis/tag";

export default function DetailTag(){
    let { id } = useParams();
    const [tag, setTag] = useState({});

    useEffect(async () => {
        let _tag = await showTag(id);
        setTag(_tag);
    }, []);
        
    return (
        <div>
           <Row className="detail__area">
               <Col span={24}>
                    <Card title={`Tag's Information`}>
                        <Row>
                            <table className="__table__info">
                                <tbody className="__basic__info">
                                    <tr>
                                        <td>Title</td>
                                        <th>{tag.title}</th>
                                    </tr>
                                    <tr>
                                        <td>Slug</td>
                                        <th>{tag.slug}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </Row>
                    </Card>
               </Col>
           </Row>
        </div>
    )
}