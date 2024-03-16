import { Avatar, List, Modal, Select } from "antd";

const ApparatusPopup = ({isOpen, setIsOpen, selectApparatus}) => {

    let options = [
        {name: "ATV", image: "/assets/images/fire/atv.png"},
        {name: "Boat", image: "/assets/images/fire/boat.png"},
        {name: "Brush", image: "/assets/images/fire/brush.png"},
        {name: "Squad", image: "/assets/images/fire/car.png"},
        {name: "Fire Truck", image: "/assets/images/fire/fire-truck.png"},
        {name: "Ladder Truck", image: "/assets/images/fire/ladder_truck.png"},
        {name: "Rescue", image: "/assets/images/fire/rescue.png"},
        {name: "Tanker", image: "/assets/images/fire/tanker.png"},
    ]

    const onChange = (val) => {
        selectApparatus(options[val])
        setIsOpen(false)
    }

    return (<Modal title="Choose Appratus Type" footer="" open={isOpen} onCancel={() => setIsOpen(false)}>
         <h3 style={{marginTop: '10px', fontSize: '13px'}}>Select Apparatus</h3>
         <Select
            style={{width: '100%'}}
            showSearch
            placeholder="Select Apparatus Type"
            optionFilterProp="children"
            onChange={onChange}
        >{
            options.map((apparatus, index) => {
                return (<Select.Option value={index}>
                     <List.Item.Meta style={{display: 'inline-flex', gap: '5px', padding: '5px'}} avatar={<Avatar src={apparatus.image}/>} title={apparatus.name}/>
                </Select.Option>)
            })
        }
        </Select>
    </Modal>)
}

export default ApparatusPopup;