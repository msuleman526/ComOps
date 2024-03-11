import { Modal, Select } from "antd";

const ApparatusPopup = ({isOpen, setIsOpen, selectApparatus}) => {

    let options = [
        "/assets/images/fire/atv.png",
        "/assets/images/fire/boat.png",
        "/assets/images/fire/brush.png",
        "/assets/images/fire/car.png",
        "/assets/images/fire/fire-truck.png",
        "/assets/images/fire/ladder_truck.png",
        "/assets/images/fire/rescue.png",
        "/assets/images/fire/tanker.png",
    ]

    const onChange = (val) => {
        selectApparatus(options[val])
        setIsOpen(false)
    }

    return (<Modal title="Choose Appratus Type" footer="" open={isOpen} onCancel={() => setIsOpen(false)}>
         <Select
            style={{width: '100%'}}
            showSearch
            placeholder="Select Apparatus Type"
            optionFilterProp="children"
            onChange={onChange}
        ><Select.Option value={0}>ATV</Select.Option>
        <Select.Option value={1}>Boat</Select.Option>
        <Select.Option value={2}>Brush</Select.Option>
        <Select.Option value={3}>Squad</Select.Option>
        <Select.Option value={4}>Fire Truck</Select.Option>
        <Select.Option value={5}>Ladder Truck</Select.Option>
        <Select.Option value={6}>Rescue</Select.Option>
        <Select.Option value={7}>Tanker</Select.Option>
        </Select>
    </Modal>)
}

export default ApparatusPopup;