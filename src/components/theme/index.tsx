import { useCallback, useEffect, useState } from "react";
import { Drawer, Col, Row, message, Button, Radio } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import { getKey, setKey } from "@/utils";
import "./index.less";

var darkTheme: ThemeJSON = require("@/assets/theme/dark.json");
var defaultTheme: ThemeJSON = require("@/assets/theme/default.json");

interface ThemeData {
  label: string
  value: string
  colorList: ThemeJSON
}
interface ThemeJSON {
  [key: string]: string
}
interface GetColor {
  background: string
}
const Themes: ThemeData[] = [
  { label: "默认", value: "default", colorList: defaultTheme },
  { label: "暗黑", value: "dark", colorList: darkTheme },
];


function findInfoColor(list: ThemeJSON[], obj: ThemeJSON) {
  return list.map((item) => {
    let key = item.key;
    let value = obj[key];
    if (value) {
      item.value = value;
    }
    return item;
  });
}

function setObjVal(list: ThemeJSON[], obj: ThemeJSON) {
  list.forEach((i) => {
    if (obj[i.key]) {
      obj[i.key] = i.value;
    }
  });
}

const getColor = (color: string): GetColor => ({
  background: color,
});
const THEME_NAME: string = getKey(true, "theme-name");
const THEME: ThemeJSON = getKey(true, "theme");
export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState({});
  const [colorShow, setColorShow] = useState(false);
  const [colorList, setColor] = useState(process.env.varColors);
  const [themeStyle, setStyle] = useState(THEME_NAME || Themes[0].value);
  // 关闭色板
  const onCloseColor = useCallback(() => {
    setInfo({});
    setColorShow(false);
  }, []);

  // 设置主题
  const setTheme = useCallback(
    (obj, list, tip = true) => {
      window.less
        .modifyVars(obj)
        .then(() => {
          tip && message.success("修改主题色成功");
          setColor(list);
          onCloseColor();
        })
        .catch(() => {
          tip && message.error("修改失败");
        });
    },
    [onCloseColor]
  );
  // 初始化主题
  useEffect(() => {
    if (THEME && THEME_NAME) {
      let newColorList = [...colorList.map((i) => ({ ...i }))];
      newColorList = findInfoColor(newColorList, THEME);
      let newColorObj = {
        ...Themes.find((i) => i.value === THEME_NAME).colorList,
      };
      setTheme(newColorObj, newColorList, false);
      setStyle(THEME_NAME);
    }
    // eslint-disable-next-line
  }, []);

  // 关闭抽屉
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  // 显示抽屉
  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  // 自定义颜色选中
  const onChangeComplete = useCallback(
    (v: string, k: string) => {
      let newColorList = [...colorList.map((i) => ({ ...i }))];
      newColorList.forEach((i) => {
        if (i.key === k) {
          i.value = v.hex;
        }
      });
      let colorObj = {
        ...Themes.find((i) => i.value === themeStyle).colorList,
      };
      setObjVal(newColorList, colorObj);
      setTheme(colorObj, newColorList);
    },
    [colorList, setTheme, themeStyle]
  );

  // 选中
  const onSelect = useCallback((e, info) => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    let { clientX: pageX, clientY: pageY } = e;
    if (pageY + 350 > height) {
      pageY -= 320;
    }
    if (pageX + 250 > width) {
      pageX -= 220;
    }
    setInfo({ ...info, pageX, pageY });
    setColorShow(true);
  }, []);

  // 保存本地
  const saveLocalTheme = useCallback(() => {
    let themeObj = { ...Themes.find((i) => i.value === themeStyle).colorList };
    themeObj = colorList.reduce((a, c) => {
      a[c.key] = c.value;
      return a;
    }, themeObj);
    setKey(true, "theme-name", themeStyle);
    setKey(true, "theme", themeObj);
    message.success("主题成功保存到本地！");
  }, [themeStyle, colorList]);

  // 选择主题
  const themeChange = useCallback(
    (e) => {
      const { value } = e.target;
      const colorObj = {
        ...Themes.find((i) => i.value === value).colorList,
      };
      setObjVal(colorList, colorObj);
      setTheme(colorObj, colorList);
      setStyle(value);
    },
    [colorList, setTheme]
  );
  return (
    <div className="set-theme">
      <div className="icon" onClick={showDrawer}>
        <MyIcon type="icon_pen" />
      </div>
      <Drawer
        className="drawer"
        title="设置主题颜色"
        placement="right"
        closable={false}
        onClose={onClose}
        width={400}
        visible={visible}
        onClick={onCloseColor}
      >
        <Radio.Group
          options={Themes}
          onChange={themeChange}
          value={themeStyle}
          optionType="button"
          buttonStyle="solid"
        />
        <Row className="color-row primary">自定义Less变量:</Row>
        {colorList.map((i) => (
          <Row className="color-row" justify="space-between" key={i.key}>
            <Col>{i.title}:</Col>
            <Col
              className="color-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(e, i);
              }}
              style={getColor(i.value)}
            ></Col>
          </Row>
        ))}

        <Row justify="center">
          <Button type="primary" onClick={saveLocalTheme}>
            保存本地
          </Button>
        </Row>
        <Color
          pageX={selectInfo.pageX}
          pageY={selectInfo.pageY}
          color={selectInfo.value}
          colorKey={selectInfo.key}
          onSureChange={onChangeComplete}
          onClose={onCloseColor}
          isShow={colorShow}
        />
      </Drawer>
    </div>
  );
}
