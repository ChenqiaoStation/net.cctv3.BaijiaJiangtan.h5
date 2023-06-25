import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  Card,
  Image,
  Popconfirm,
  Segmented,
  Tabs,
  Tag,
  message,
} from "antd";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Host4Springboot, useDurationFormatter, useHttpGet } from "../../x";
import EditModal from "./EditModal";

type ChapterItem = {
  id: string;
  seriesId?: string;
  cctvId?: string;
  title?: string;
  capture?: string;
  message?: string;
  cctvM3u8?: string;
  cctvWeb?: string;
  cctvMp4Intervals?: string;
  cctvMp4Urls?: string;
  cctvMp3?: string;
  duration?: number;
  createTime?: string;
  spiderTime?: string;
  updateTime?: string;
  status?: number;
};

const ChapterPage = () => {
  const actionRef = useRef<ActionType>();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [item, setItem] = useState<any>(Object.create(null));
  const [datas, setDatas] = useState<ChapterItem[]>([]);
  const [status, setStatus] = useState("0");
  const [total, setTotal] = useState(0);
  const STATUSES = ["原始数据", "完成编辑", "重复数据", "测试数据"];
  const columns: ProColumns<ChapterItem>[] = [
    {
      title: "封面",
      width: 110,
      dataIndex: "capture",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <Image
          src={record.capture}
          style={{ width: 80, height: 45, borderRadius: 4 }}
          fallback="https://net-cctv3.oss-cn-qingdao.aliyuncs.com/net.cctv3.BaijiaJiangtan/BaiduErrors.jpg"
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: true,
    },
    {
      title: "系列",
      dataIndex: "seriesId",
      width: 80,
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      title: "CCTV",
      dataIndex: "cctvId",
      width: 80,
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      title: "标题",
      width: 150,
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "介绍",
      width: 150,
      dataIndex: "message",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 60,
      title: "CCTV链接",
      dataIndex: "cctvWeb",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <a href={record.cctvWeb} target="_blank">
          访问
        </a>
      ),
    },
    {
      width: 60,
      title: "Mp3",
      dataIndex: "cctvMp3",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => (
        <a href={record.cctvMp3} target="_blank">
          访问
        </a>
      ),
    },
    {
      title: "时长",
      width: 60,
      dataIndex: "duration",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => <div>{useDurationFormatter(record.duration)}</div>,
    },
    {
      width: 90,
      title: "创建时间",
      dataIndex: "createTime",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 90,
      title: "修改时间",
      dataIndex: "updateTime",
      ellipsis: true,
      renderFormItem: () => null,
    },
    {
      width: 80,
      disable: true,
      title: "状态",
      dataIndex: "status",
      ellipsis: true,
      renderFormItem: () => null,
      render: (_, record) => <div>{STATUSES[record.status]}</div>,
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
                `${Host4Springboot}/deleteChapter.do`,
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

  useEffect(() => {
    actionRef.current.reload();
    return function () {};
  }, [status]);

  return (
    <>
      <Card title="数据状态">
        <Segmented
          options={STATUSES.map((_, i) => {
            return {
              label: _,
              value: `${i}`,
              children: null,
            };
          })}
          onChange={(value) => setStatus(`${value}`)}
        />
      </Card>
      <ProTable<ChapterItem>
        // dataSource={datas}
        scroll={{ x: 1366 }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          let result = await useHttpGet(
            `${Host4Springboot}/selectChaptersByStatus.do?status=${status}`
          );
          setTotal(result.total);
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
        headerTitle="章节管理"
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

export default ChapterPage;
