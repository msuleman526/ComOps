import { Avatar, List, Modal, Select, message } from "antd";
import { useState } from "react";

const AreaPopup = ({isOpen, setIsOpen, chooseArea}) => {

    let [selectedArea, setSelectedArea] = useState(null)
    let areaTypes = [
        {name: "Warning Area", color: "#EED202"},
        {name: "Hot Area", color: "#FF0000"},
        {name: "Safe Area", color: "#1ac74b"}

    ]
    const onAreaChange = (index) => {
        setSelectedArea(areaTypes[index])
    }

    const onAreaDoneButton = () => {
         if(selectedArea == null){
            message.error("Please select area type")
        }else{
            chooseArea(selectedArea)
        }
        setIsOpen(false)
    }

    return (<Modal title="Area Type" onOk={onAreaDoneButton} open={isOpen} onCancel={() => setIsOpen(false)}>
         <h3 style={{marginTop: '10px', fontSize: '13px'}}>Select Area Type</h3>
         <Select
            style={{width: '100%'}}
            showSearch
            placeholder="Area Type"
            optionFilterProp="children"
            onChange={onAreaChange}
        >{
            areaTypes.map((area, index) => {
                return (<Select.Option value={index}>
                    <List.Item.Meta style={{display: 'inline-flex', gap: '5px', padding: '5px'}} avatar={<Avatar style={{background: area.color}}/>} title={area.name}/>
                </Select.Option>)
            })
        }
        </Select>
    </Modal>)
}
export default AreaPopup;