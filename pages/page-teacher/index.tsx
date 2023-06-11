import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Dropdown, Image, Switch} from 'antd';
import {CSSProperties, useRef, useState} from 'react';
import {Host4Springboot, useHttpGet} from '../../x';
import EditModal from './EditModal';

type TeacherItem = {
  id: string;
  name: string;
  avatar?: string;
  title?: string;
  message?: string;
  create_time?: string;
  update_time?: string;
  status?: number;
};

const TeacherPage = () => {
  const actionRef = useRef<ActionType>();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [item, setItem] = useState<any>(Object.create(null));
  const columns: ProColumns<TeacherItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      ellipsis: true,
    },
    {
      title: '头像',
      width: 70,
      dataIndex: 'capture',
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <Image
          src={record.avatar}
          style={{width: 50, height: 50, borderRadius: 25}}
          fallback="https://net-cctv3.oss-cn-qingdao.aliyuncs.com/net.cctv3.BaijiaJiangtan/BaiduErrors.jpg"
        />
      ),
    },
    {
      title: '姓名',
      width: 60,
      dataIndex: 'name',
      ellipsis: true,
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '此项为必填项',
      //     },
      //   ],
      // },
      render: (_, record) => <div>{record.name}</div>,
    },
    {
      title: '职业',
      width: 150,
      dataIndex: 'title',
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      title: '介绍',
      width: 150,
      dataIndex: 'message',
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 80,
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 80,
      title: '修改时间',
      dataIndex: 'updateTime',
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 60,
      disable: true,
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <Switch checked={record.status == 1} disabled={true} />
      ),
    },
    {
      title: '操作',
      fixed: 'right',
      width: 60,
      renderFormItem: () => null,
      render: (text, record, _, action) => [
        <div>
          <a
            key="editable"
            onClick={() => {
              // action?.startEditable?.(record.id);
              setItem({...record});
              setIsShowEditModal(true);
            }}>
            编辑
          </a>
          <div style={{width: 32}} />
          <a key="view" onClick={() => {}}>
            删除
          </a>
        </div>,

        // <TableDropdown
        //   key="actionGroup"
        //   onSelect={() => action?.reload()}
        //   menus={[
        //     {key: 'copy', name: '复制'},
        //     {key: 'delete', name: '删除'},
        //   ]}
        // />,
      ],
    },
  ];

  return (
    <>
      <ProTable<TeacherItem>
        scroll={{x: 1366}}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          let result = await useHttpGet(`${Host4Springboot}/selectTeachers.do`);
          return result;
        }}
        columnsState={{
          /** 保留这两行没法固定列 */
          // persistenceKey: 'pro-table-singe-demos',
          // persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: page => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="教师管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              setItem(Object.create(null));
              setIsShowEditModal(true);
            }}
            type="primary">
            新建
          </Button>,
        ]}
      />
      <EditModal
        item={item}
        isShowEditModal={isShowEditModal}
        onSumbit={() => {
          setIsShowEditModal(false);
          setItem(Object.create(null));
          actionRef.current.reload();
        }}
        onOpenChange={setIsShowEditModal}
      />
    </>
  );
};

const viewHeader: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

export default TeacherPage;
