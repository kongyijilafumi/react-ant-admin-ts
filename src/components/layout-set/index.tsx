import { useState } from "react";
import MyIcon from "../icon";
import { Button, Drawer, message, Row } from "antd";
import { connect } from "react-redux";
import { changeLayoutMode } from "@/store/layout/action";
import * as Types from "../../store/layout/actionTypes";
import { setLayoutMode } from "@/utils";
import singImg from "@/assets/images/layout2.jpg";
import twoImg from "@/assets/images/layout1.jpg";
import { Dispatch, LayoutMode, State, LayoutModes } from "@/types"
import "./index.less";

interface LayoutSetProps {
  setMode: (s: LayoutMode) => void
  layoutMode: LayoutMode
}

const modes: LayoutModes = [
  {
    img: singImg,
    mode: Types.SINGLE_COLUMN,
    alt: "单列布局",
  },
  {
    img: twoImg,
    mode: Types.TWO_COLUMN,
    alt: "两列布局",
  },
];
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMode: (mode: LayoutMode) => dispatch(changeLayoutMode(mode)),
});
const mapStateToProps = (state: State) => ({
  layoutMode: state.layout,
});



function useLayoutSet({ setMode, layoutMode }: LayoutSetProps) {
  const [visible, setVisible] = useState(false);
  const wakeup = () => setVisible(true);
  const onClose = () => setVisible(false);
  const setLayout = (mode: LayoutMode) => {
    setMode(mode);
    message.success("布局设置成功！");
  };
  const saveLayout = () => {
    setLayoutMode(layoutMode);
    message.success("布局保存本地成功！");
  };
  return { wakeup, visible, onClose, setLayout, saveLayout };
}

function LayoutSet(props: LayoutSetProps) {
  const { wakeup, visible, onClose, setLayout, saveLayout } =
    useLayoutSet(props);
  return (
    <div className="layoutset-container">
      <MyIcon type="icon_setting" onClick={wakeup} />
      <Drawer
        className="layoutset-drawer"
        title="设置布局"
        placement="right"
        closable={false}
        onClose={onClose}
        width={300}
        visible={visible}
      >
        <h2 className="title">选择布局</h2>
        <Row justify="space-around">
          {modes.map((m) => (
            <div
              key={m.mode}
              onClick={() => setLayout(m.mode)}
              className={m.mode === props.layoutMode ? "col active" : "col"}
            >
              <img src={m.img} alt={m.alt + m.mode + props.layoutMode}></img>
            </div>
          ))}
        </Row>
        <Row className="save" justify="center">
          <Button type="primary" onClick={saveLayout}>
            保存此布局
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSet);
