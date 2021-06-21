import React, { useCallback, useMemo, useState } from "react";
import { Button, Table, Row, Col } from "antd";
import MyPagination from "@/components/pagination";
import UserModal, { UserID } from "@/components/modal/user";
import { getUserList } from "@/api";
import "./index.less";

import { MapKey, ResponseUserInfo } from "@/types/api"

export default function User() {
  const [tableData, setData] = useState<ResponseUserInfo[]>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [chooseId, setId] = useState<UserID>(null);
  const [pageData, setPage] = useState(null);
  // 显示弹窗
  const showInfoModal = useCallback((id: UserID, type: boolean) => {
    if (id) {
      setId(id);
    } else {
      setId(null);
    }
    setShow(type);
  }, []);

  //
  const showEdit = useCallback(
    (id) => {
      showInfoModal(id, true);
    },
    [showInfoModal]
  );
  const activeCol = useMemo(
    () => ({
      dataIndex: "active",
      key: "active",
      title: "操作",
      align: "center",
      render: (text: string, record: ResponseUserInfo) => (
        <Button type="link" onClick={() => showEdit(record.user_id)}>
          编辑
        </Button>
      ),
    }),
    [showEdit]
  );
  const renderTitle = useCallback(
    () => (
      <Row justify="space-between" gutter={80}>
        <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
        <Col>
          <Button type="primary" onClick={() => showInfoModal(null, true)}>
            添加用户
          </Button>
        </Col>
      </Row>
    ),
    [showInfoModal]
  );
  const getUserData = useCallback(
    (data) => {
      setPage(data);
      getUserList(data).then((res) => {
        const { data, status, total } = res;
        if (status === 0 && data) {
          const { mapKey, list } = data;
          mapKey.push(activeCol);
          setCol(mapKey);
          setTotal(total);
          setData(list);
        }
      });
    },
    [activeCol]
  );
  const updateUserData = useCallback(() => {
    getUserData(pageData);
  }, [pageData, getUserData]);

  return (
    <div className="user-container">
      <Table
        title={renderTitle}
        dataSource={tableData}
        rowKey="user_id"
        columns={tableCol}
        pagination={false}
      />
      <MyPagination
        total={total}
        immediately={getUserData}
        change={getUserData}
      />
      <UserModal
        isShow={showModal}
        user_id={chooseId}
        onCancel={showInfoModal}
        onOk={updateUserData}
      />
    </div>
  );
}

User.route = { path: "/power/user" };
