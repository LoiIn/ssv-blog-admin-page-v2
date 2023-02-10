import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Switch,
  DatePicker,
  Space,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../../../apis/category";
import { addNewPost, showPost, updateInfo } from "../../../apis/post";
import { getStringDate, changeToSlug, makeMoment } from "../../../apis/tools";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

Quill.register("modules/imageResize", ImageResize);
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    displayStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
    },
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function FormPost() {
  var { id } = useParams();
  const [content, setContent] = useState("");
  const [formAdd] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const history = useNavigate();
  const [checkDate, setCheckDate] = useState(false);
  const [post, setPost] = useState({});
  const [cover, setCover] = useState({});
  const [curCate, setCurcate] = useState([]);
  const [curImg, setCurImg] = useState([
    "https://icon2.cleanpng.com/20180320/hww/kisspng-computer-icons-directory-computer-file-png-transparent-no-5ab134adbd3e51.0821639815215627977751.jpg",
  ]);

  useEffect(() => {
    const loadData = async () => {
      if (id !== undefined) {
        let { status, data } = await showPost(id);
        if (status === "success") {
          var _post = {
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            content: data.content,
            published_flag: data.published_flag,
            published_at: makeMoment(data.published_at),
            category: data.category,
            tags: data.tags,
          };
          setCheckDate(data.published_flag);
          setPost(_post);
          setContent(data.content);
          formAdd.setFieldsValue(_post);
          setCurcate(data.category);
          setCurImg(data.image);
        }
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    formAdd.validateFields(["published_at"]);
  }, [checkDate]);

  useEffect(() => {
    const getCates = async () => {
      let res = await getAllCategories();
      if (res !== "fail") setCategories(res);
    };

    getCates();
  }, []);

  const onSwitch = (e) => {
    setCheckDate(e);
  };

  const onReset = () => {
    setContent("");
    setCheckDate(false);
    formAdd.resetFields();
  };

  const onSubmit = async (values) => {
    if (checkDate === true) {
      let _date = formAdd.getFieldValue("published_at");
      values["published_at"] = getStringDate(_date);
    }

    values.image = cover;

    let rs = id ? await updateInfo(id, values) : await addNewPost(values);
    if (rs === "success") history(-1);

    // onReset();
  };

  const imgProps = {
    name: "photo",
    accept: ".jpg, .jpeg, .png",
    maxCount: 1,
    listType: "picture",
    beforeUpload: async (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCover(e.target.result);
      };
      reader.readAsDataURL(file);

      return false;
    },
  };

  return (
    <div>
      <Row className="detail__area">
        <Col span={24}>
          <Form form={formAdd} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title filed is required" }]}
            >
              <Input placeholder="Add title" allowClear />
            </Form.Item>
            <Form.Item
              label="Summary"
              name="summary"
              rules={[{ required: true, message: "Summary filed is required" }]}
            >
              <TextArea
                placeholder="Add summary"
                autoSize={{
                  minRows: 1,
                  maxRows: 6,
                }}
                allowClear
              />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Category filed is required" },
                  ]}
                  style={{ marginRight: "5px" }}
                >
                  <Select
                    defaultValue={curCate.id}
                    placeholder="Select caetgory"
                    optionLabelProp="label"
                    allowClear
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tags"
                  name="tags"
                  style={{ marginLeft: "5px" }}
                >
                  <Select
                    mode="tags"
                    placeholder="Select tags"
                    allowClear
                    options={tags.map((tag) => ({
                      label: tag,
                      value: tag,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <Image width={"95%"} src={curImg} />
              </Col>
              <Col span={12}>
                <Space
                  direction="vertical"
                  style={{
                    width: "100%",
                    marginLeft: "5px",
                  }}
                  size="large"
                >
                  <Upload {...imgProps}>
                    <Button icon={<UploadOutlined />}>Image Cover</Button>
                  </Upload>
                </Space>
              </Col>
            </Row>
            <Form.Item
              initialValue={content}
              label="Content"
              name="content"
              rules={[{ required: true, message: "Content filed is required" }]}
            >
              <ReactQuill
                onChange={setContent}
                theme="snow"
                modules={modules}
                formats={formats}
              />
            </Form.Item>
            <Row>
              <Col span={4}>
                <Form.Item label="Published" name="published_flag">
                  <Switch checked={checkDate} onClick={onSwitch} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Published Date"
                  name="published_at"
                  rules={[
                    {
                      required: checkDate,
                      message: "Publised date filed is required",
                    },
                  ]}
                >
                  <DatePicker disabled={!checkDate} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  icon={<RollbackOutlined />}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Summit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
