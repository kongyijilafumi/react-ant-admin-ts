import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Row, Col } from "antd";
import TypeModal, { Info } from "@/components/modal/type";
import { getPower } from "@/api";
import MyTable from "@/components/table";
import "./index.less";
import { MapKey, PowerList } from "@/types"
function useTypes() {
  const [showModal, setShow] = useState(false);
  const [tableData, setData] = useState<PowerList>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [choose, setChoose] = useState<Info>(null);
  useEffect(() => {
    getTypeData();
    // eslint-disable-next-line
  }, []);
  const modalControl = useCallback((info: Info, open: boolean) => {
    setChoose(info);
    setShow(open);
  }, []);
  const activeCol = useMemo(
    () => ({
      dataIndex: "active",
      key: "active",
      title: "操作",
      align: "center",
      render: (text: any, record: any) => (
        <Button type="link" onClick={() => modalControl(record, true)}>
          编辑
        </Button>
      ),
    }),
    [modalControl]
  );
  const renderTitle = useCallback(
    () => (
      <Row justify="space-between" gutter={80}>
        <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
        <Col>
          <Button type="primary" onClick={() => modalControl(null, true)}>
            添加管理权限
          </Button>
        </Col>
      </Row>
    ),
    [modalControl]
  );
  const getTypeData = useCallback(() => {
    getPower().then((res) => {
      if (res.status === 0) {
        res.mapKey.push(activeCol);
        setData(res.data);
        setCol(res.mapKey);
      }
    });
  }, [activeCol]);
  return {
    renderTitle,
    tableCol,
    tableData,
    showModal,
    choose,
    modalControl,
    getTypeData,
  };
}

export default function Types() {
  const {
    renderTitle,
    tableCol,
    tableData,
    showModal,
    choose,
    modalControl,
    getTypeData,
  } = useTypes();
  return (
    <div className="type-container">
      <MyTable
        rowKey="type"
        title={renderTitle}
        columns={tableCol}
        dataSource={tableData}
      />
      <TypeModal
        isShow={showModal}
        info={choose}
        onCancel={modalControl}
        onOk={getTypeData}
      />
    </div>
  );
}

Types.route = { path: "/power/type" };
