import { Avatar, List, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const HazardsPopup = ({isOpen, setIsOpen, selectedHazard}) => {

    let harzards = [
        {name: "Fire", image: "/assets/images/hazards/fire.png", children: false, width: 40, height: 50},
        {name: "Electrical", image: "/assets/images/hazards/electrical.png", children: false, width: 70, height: 70},
        {name: "Traffic", image: "/assets/images/hazards/traffic.png", children: false, width: 50, height: 40},
        {name: "Combustible", image: "/assets/images/hazards/combustible.jpg", children: false, width: 50, height: 75},
        {name: "Hazmat", image: "/assets/images/hazards/hazmat.png", children: true, width: 60, height: 60, childs: 
        [
            {name: "Explosive 1.1", image: "/assets/images/hazards/hazmat/explosive1.1.png", width: 60, height: 60},
            {name: "Explosive 1.2", image: "/assets/images/hazards/hazmat/explosive1.2.png", width: 60, height: 60},
            {name: "Explosive 1.3", image: "/assets/images/hazards/hazmat/explosive1.3.png", width: 60, height: 60},
            {name: "Explosive 1.4", image: "/assets/images/hazards/hazmat/explosive1.4.png", width: 60, height: 60},
            {name: "Explosive 1.5", image: "/assets/images/hazards/hazmat/explosive1.5.png", width: 60, height: 60},
            {name: "Oxygen 2", image: "/assets/images/hazards/hazmat/oxygen.png", width: 60, height: 60},
            {name: "Flammable Gas", image: "/assets/images/hazards/hazmat/flamlable.png", width: 60, height: 60},
        ]
        },
        {name: "Hole/Trech", image: "/assets/images/hazards/trench.png", children: false, width: 70, height: 40},
        {name: "Slippery", image: "/assets/images/hazards/slippery.png", children: false, width: 50, height: 75},
    ]

    let [selectHazard, setSelectHazard] = useState(null)
    let [selectedHazardIndex, setSelectHazardIndex] = useState(-1)

    useEffect(() => {
        if(isOpen){
            console.log("Chekcing")
            setSelectHazard(null)
            setSelectHazardIndex(-1)
        }
    }, [isOpen])

    const onChange = (index) => {
        if(harzards[index].children == true){
            setSelectHazard(harzards[index])
        }else{
            setSelectHazard(null)
            selectedHazard(harzards[index])
            setSelectHazardIndex(-1)
            setIsOpen(false)
        }
    }

    const onSelectedHazardChange = (index) => {
        selectedHazard(selectHazard.childs[index])
        setIsOpen(false)
    }

    return (<Modal title="Choose Hazard" footer="" open={isOpen} onCancel={() => setIsOpen(false)}>
         <h3 style={{marginTop: '10px', fontSize: '13px'}}>Select Hazard</h3>
         <Select
            style={{width: '100%'}}
            showSearch
            placeholder="Select Hazard Type"
            optionFilterProp="children"
            value={(selectedHazardIndex == -1) ? "Hazard Type" : selectedHazardIndex}
            onChange={onChange}
        >{
            harzards.map((harzard, index) => {
                return (<Select.Option value={index}>
                    <List.Item.Meta style={{display: 'inline-flex', gap: '5px', padding: '5px'}} avatar={<Avatar src={harzard.image}/>} title={harzard.name}/>
                </Select.Option>)
            })
        }
        </Select>
        {selectHazard != null && selectHazard.children == true && 
            <>
                <h3 style={{marginTop: '10px', fontSize: '13px'}}>Select {selectHazard.name}</h3>
                <Select
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Select Apparatus Type"
                    optionFilterProp="children"
                    onChange={onSelectedHazardChange}
                >{
                    selectHazard.childs.map((harzard, index) => {
                        return (<Select.Option value={index}>
                            <List.Item.Meta style={{display: 'inline-flex', gap: '5px', padding: '5px'}} avatar={<Avatar src={harzard.image}/>} title={harzard.name}/>
                        </Select.Option>)
                    })
                }
                </Select>
            </>
        }
    </Modal>)
}
export default HazardsPopup;