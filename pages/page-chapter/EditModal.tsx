import {
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormGroup,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Form, Image, message} from 'antd';
import React, {useEffect, useState} from 'react';

import {Host4Springboot, useDurationFormatter, useHttpPost} from '../../x';

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
const EditModal: React.FC<MyProps> = props => {
  const {isShowEditModal, onSumbit, onOpenChange, item} = props;
  const [data, setData] = useState(Object.create(null));
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('onValuesChange: ', data);
    return function () {};
  }, [data]);

  useEffect(() => {
    form.resetFields();
    setData({...item});
    form.setFieldsValue({...item});
    return function () {};
  }, [item]);

  return (
    <>
      <ModalForm
        form={form}
        onInit={() => {
          // form.resetFields();
        }}
        onValuesChange={values => {
          setData(_data => ({
            ..._data,
            ...values,
          }));
        }}
        title="章节管理"
        open={isShowEditModal}
        onFinish={async values => {
          let _data = {...data};
          let result = await useHttpPost(
            `${Host4Springboot}/mergeChapter.do`,
            JSON.stringify(_data),
          );
          if (result.success) {
            message.success('提交成功');
            onSumbit();
          } else {
          }
        }}
        onOpenChange={onOpenChange}>
        <ProFormGroup>
          <ProFormText
            width={'lg'}
            name="title"
            label="标题"
            placeholder="请输入标题"
          />
          <ProFormSelect
            name={'status'}
            label="数据状态"
            width={'sm'}
            options={['原始数据', '完成编辑', '重复数据', '测试数据'].map(
              (it, i) => ({
                value: i,
                label: it,
              }),
            )}
            rules={[{required: true, message: '请选择数据状态'}]}
          />
        </ProFormGroup>
        <ProForm.Group>
          <ProFormText
            width={'md'}
            name="seriesId"
            label="所属系列"
            placeholder="请输入系列编号"
          />
          <ProFormText
            width={'md'}
            name="teacherId"
            label="演讲教师"
            placeholder="请输入教师编号"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            width={'lg'}
            name="message"
            label="简介"
            placeholder="请输入介绍"
          />
          <ProFormItem label="预览">
            <Image
              src={data?.capture}
              style={{width: 160, height: 90, borderRadius: 4}}
              fallback="https://net-cctv3.oss-cn-qingdao.aliyuncs.com/net.cctv3.BaijiaJiangtan/BaiduErrors.jpg"
            />
          </ProFormItem>
        </ProForm.Group>
        <ProFormText
          width={'lg'}
          name="capture"
          label="封面"
          placeholder="请输入头像地址"
        />
        <ProForm.Group>
          <ProFormText
            name="duration"
            label={`视频时长 → ${useDurationFormatter(data?.duration)}`}
          />
          <ProFormDateTimePicker name="createTime" label="创建时间" />
          <ProFormDateTimePicker name="updateTime" label="修改时间" />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default EditModal;
