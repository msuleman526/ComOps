import { Button, Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: "Apparatus",
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Hazard/Dangerous Object",
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Area/Zones",
  },
];

const IncidentButton = ({ onMenuSelection }) => (
  <Space
    direction="vertical"
    style={{ bottom: "25px", right: "60px", position: "absolute" }}
  >
    <Space wrap>
      <Dropdown menu={{ items, onClick: onMenuSelection }} placement="top">
        <Button style={{ width: "200px", height: "50px", fontSize: "20px" }}>
          Add
        </Button>
      </Dropdown>
    </Space>
  </Space>
);
export default IncidentButton;
