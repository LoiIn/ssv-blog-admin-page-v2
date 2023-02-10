import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag, Image } from "antd";

import { useParams } from "react-router-dom";
import { showPost } from "../../../apis/post";

export default function DetailPost() {
  let { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const loadData = async () => {
      let { status, data } = await showPost(id);
      if (status === "success") {
        data.author = data.author.name;
        data.category = data.category.name;
        setPost(data);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <Row className="detail__area">
        <Col span={24}>
          <Card title={`Post's Information`}>
            <Row>
              <table className="__table__info">
                <tbody className="__basic__info">
                  <tr>
                    <td>Title</td>
                    <th>{post.title}</th>
                  </tr>
                  <tr>
                    <td>Slug</td>
                    <th>{post.slug}</th>
                  </tr>
                  <tr>
                    <td>Summary</td>
                    <th>{post.summary}</th>
                  </tr>
                  <tr>
                    <td>Content</td>
                    <th className="__post__content">
                      <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      ></div>
                    </th>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <th>{post.author}</th>
                  </tr>
                  <tr>
                    <td>Published</td>
                    <th>{post.published_flag ? "Yes" : "No"}</th>
                  </tr>
                  <tr>
                    <td>Published At</td>
                    <th>{post.published_at}</th>
                  </tr>
                  <tr>
                    <td>Categories</td>
                    <th>{post.category}</th>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <th>
                      {post.tags !== undefined
                        ? post.tags.map((tag) => {
                            let color = tag.length > 7 ? "purple" : "gold";
                            return (
                              <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                              </Tag>
                            );
                          })
                        : post.tags}
                    </th>
                  </tr>
                  <tr>
                    <td>Created At</td>
                    <th>{post.created_at}</th>
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
