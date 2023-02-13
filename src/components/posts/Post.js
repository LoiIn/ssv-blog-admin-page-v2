import React from "react";
import { Table, Button, Row, Space, Tag } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useHookPost from "./../../hooks/post";
import SearchPost from "./Search";

const { Column } = Table;

export default function Post() {
  const history = useNavigate();
  const [
    posts,
    addPost,
    updatePost,
    deletePost,
    viewPost,
    searchPosts,
    getIndex,
  ] = useHookPost();

  const viewDetail = (id) => {
    history(`/posts/${id}`);
  };

  const editPost = (id) => {
    history(`/posts/${id}/edit`);
  };

  return (
    <div>
      <SearchPost onSearch={(data) => searchPosts(data)} />

      <Row className="user__action">
        <div className="heading">Blog's table</div>
        <Button icon={<PlusOutlined />}>
          <Link to="/posts/new/create">Add Post</Link>
        </Button>
      </Row>

      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={posts}
      >
        <Column title="Title" dataIndex="title" key="title" width="15%" />
        <Column title="Slug" dataIndex="slug" key="slug" width="15%" />
        <Column
          title="Published"
          dataIndex="published_flag"
          key="published_flag"
          width="5%"
          render={(published_flag) => (
            <>
              <Tag color={published_flag ? "blue" : "red"}>
                {published_flag ? "Published" : "Not published"}
              </Tag>
            </>
          )}
        />
        <Column title="Summary" dataIndex="summary" key="summary" width="25%" />
        <Column title="Author" dataIndex="author" key="author" width="10%" />
        <Column
          title="Cateogry"
          dataIndex="category"
          key="category"
          width="10%"
        />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          width="15%"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 7 ? "purple" : "gold";
                if (tag === "ssv") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          width="5%"
          render={(text, record) => (
            <Space>
              <Button
                type="primary"
                title="View blog"
                icon={<EyeOutlined />}
                onClick={() => viewDetail(record.id)}
              />
              <Button
                title="Edit"
                icon={<EditOutlined />}
                onClick={() => editPost(record.id)}
              />
              <Button
                type="primary"
                danger
                title="Delete blog"
                icon={<DeleteOutlined />}
                onClick={() => deletePost(record.id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
