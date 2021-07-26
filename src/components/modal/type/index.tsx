import { useEffect, useState } from "react";
import { Modal, Form, Input, message, Tree } from "antd";
import { addType, editType } from "@/api";
import { MenuList } from "@/types";
const NRule = [{ required: true, message: "请填写权限名称" }];

export type Info = { name: string, type: string, menu_id: string } | null
interface ModalProps {
  info: Info
  isShow: boolean
  onCancel: (i: Info, b: boolean) => void
  onOk: () => void
  menuList: MenuList
}
const ColorStyle = {
  color: "red",
};


export default function UserModal({ info, isShow, onCancel, onOk, menuList }: ModalProps) {
  const [form] = Form.useForm();
  const [menuId, setMenuId] = useState<number[]>([]);
  useEffect(() => {
    if (info && form) {
      setMenuId(info.menu_id.split(",").map(Number));
      form.setFieldsValue(info);
    }
    // eslint-disable-next-line
  }, [info]);
  const submit = () => {
    form.validateFields().then((values) => {
      let fn = Boolean(info) ? editType : addType;
      fn({ ...values, menu_id: menuId }).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const onCheck = ({ checked }: { checked: number[], halfChecked: number[] }) => {
    setMenuId(checked);
  };
  const close = () => {
    form.resetFields();
    setMenuId([]);
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title={info ? "修改权限" : "添加权限"}
      visible={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={close}
      onOk={submit}
    >
      <Form form={form}>
        <Form.Item name="name" rules={NRule} label="权限名称">
          <Input placeholder="权限名称" />
        </Form.Item>
        <Form.Item hidden name="type_id">
          <Input />
        </Form.Item>
      </Form>
      <h3 style={ColorStyle}>选中子菜单未选中父菜单的将不会显示</h3>
      <Tree
        treeData={menuList}
        checkable
        defaultExpandAll={true}
        checkStrictly={true}
        checkedKeys={menuId}
        selectable={false}
        onCheck={onCheck as any}
      />
    </Modal>
  );
}
