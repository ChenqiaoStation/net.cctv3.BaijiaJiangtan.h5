import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormItem,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Form, Image, message } from "antd";
import React, { useEffect, useState } from "react";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Host4Springboot, useHttpPost } from "../../x";

interface MyProps {
  isShowEditModal: boolean;
  onSumbit: () => void;
  onOpenChange: (is: boolean) => void;
  item: any;
}

/**
 * @type auto 使用组件默认的宽度
 * @type xs=104px 适用于短数字、短文本或选项。
 * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
 * @type md=328px 标准宽度，适用于大部分字段长度。
 * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
 * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
 */
const EditModal: React.FC<MyProps> = (props) => {
  const { isShowEditModal, onSumbit, onOpenChange, item } = props;
  const [data, setData] = useState(Object.create(null));
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("onValuesChange: ", data);
    return function () {};
  }, [data]);

  useEffect(() => {
    form.resetFields();
    setData({ ...item });
    form.setFieldsValue({
      ...item,
    });
    return function () {};
  }, [item]);

  return (
    <>
      <ModalForm
        form={form}
        onInit={() => {
          // form.resetFields();
        }}
        onValuesChange={(values) => {
          setData((_data) => ({
            ..._data,
            ...values,
          }));
        }}
        title="通知管理"
        open={isShowEditModal}
        onFinish={async (values) => {
          let _data = { ...data };
          _data.status = _data.status ? 1 : 0;
          let result = await useHttpPost(
            `${Host4Springboot}/mergeNotice.do`,
            JSON.stringify(_data)
          );
          if (result.success) {
            message.success("提交成功");
            onSumbit();
          } else {
          }
        }}
        onOpenChange={onOpenChange}
      >
        <ProFormText name="title" label="标题" placeholder="请输入通知标题" />
        <ProFormTextArea
          name="message"
          label="简介"
          placeholder="请输入通知信息"
        />
        <ProFormTextArea
          name="remark"
          label="备注"
          placeholder="请输入系列备注"
        />
        <ProFormText name="web" label="链接" placeholder="请输入跳转链接" />
        <ProForm.Group>
          <ProFormDateTimePicker name="createTime" label="创建时间" />
          <ProFormDateTimePicker name="updateTime" label="修改时间" />
          <ProFormSwitch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            name="status"
            label="状态"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default EditModal;
