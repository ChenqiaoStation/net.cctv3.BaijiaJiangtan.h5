import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm, Switch, message } from "antd";
import { CSSProperties, useRef, useState } from "react";
import { Host4Springboot, useHttpGet } from "../../x";
import EditModal from "./EditModal";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type SeriesItem = {
  id: string;
  title: string;
  message: string;
  remark: string;
  web: string;
  createTime: string;
  updateTime: string;
  status: number;
};

const NoticePage = () => {
  const actionRef = useRef<ActionType>();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [item, setItem] = useState<any>(Object.create(null));
  const columns: ProColumns<SeriesItem>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 80,
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      title: "信息",
      dataIndex: "title",
      width: 150,
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      title: "备注",
      width: 150,
      dataIndex: "remark",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 60,
      title: "链接",
      dataIndex: "cctv",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <a href={record.web} target={"_blank"}>
          访问
        </a>
      ),
    },
    {
      width: 80,
      title: "创建时间",
      dataIndex: "createTime",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 80,
      title: "修改时间",
      dataIndex: "updateTime",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 60,
      disable: true,
      title: "状态",
      dataIndex: "status",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <Switch checked={record.status == 1} disabled={true} />
      ),
    },
    {
      title: "操作",
      fixed: "right",
      width: 60,
      renderFormItem: () => null,
      render: (text, record, _, action) => [
        <div>
          <a
            key="editable"
            onClick={() => {
              // action?.startEditable?.(record.id);
              setItem({ ...record });
              setIsShowEditModal(true);
            }}
          >
            编辑
          </a>
          <div style={{ width: 32 }} />
          <Popconfirm
            title="确认删除？"
            description={`${record.title}`}
            onConfirm={async () => {
              let result = await useHttpGet(
                `${Host4Springboot}/deleteNotice.do`,
                {
                  id: record.id,
                }
              );
              if (result.success) {
                actionRef.current.reload();
                message.success("删除成功 ~");
              } else {
                message.error("删除失败 ~");
              }
            }}
            onOpenChange={() => console.log("open change")}
          >
            <a key="view">删除</a>
          </Popconfirm>
        </div>,
      ],
    },
  ];

  return (
    <>
      <ProTable<SeriesItem>
        scroll={{ x: 1366 }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          let result = await useHttpGet(`${Host4Springboot}/selectNotices.do`);
          return result;
        }}
        columnsState={{
          /** 保留这两行没法固定列 */
          // persistenceKey: 'pro-table-singe-demos',
          // persistenceType: 'localStorage',
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === "get") {
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
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="系列编辑"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              setItem(Object.create(null));
              setIsShowEditModal(true);
            }}
            type="primary"
          >
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
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
};

export default NoticePage;
