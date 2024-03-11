import { Button, Dropdown, Space } from "antd";

const items = [
    {
      key: '1',
      label: "Apparatus"
    },
    {
        type: 'divider',
    },
    {
      key: '2',
      label: "Area"
    },
    {
        type: 'divider',
    },
    {
      key: '3',
      label: "Zone"
    },
  ];

  const IncidentButton = ({onMenuSelection}) => (
    <Space direction="vertical" style={{top: '10px', right: '60px', position: 'absolute'}}>
      <Space wrap>
        <Dropdown menu={{items, onClick: onMenuSelection}} placement="top">
            <Button>Add</Button>
        </Dropdown>
      </Space>
    </Space>
  );
  export default IncidentButton;