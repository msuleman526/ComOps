import { Avatar, Input, List, Modal, Select, message } from "antd";
import { useState } from "react";

const AppratusLblPopup = ({isOpen, setIsOpen, setApparatusLabel, currentApparatus}) => {

    const [apparatusLbl, setApparatusLbl] = useState("")

    const onLblChange = (val) => {
        setApparatusLbl(val.target.value)
    }

    const onDoneClick = () => {
        if(apparatusLbl == undefined || apparatusLbl == ""){
            setApparatusLabel(currentApparatus?.charAt(0))
        }
        else{
            setApparatusLabel(apparatusLbl)
        }
        setIsOpen(false)
    }

    return (<Modal title={"What do you want to label the " + currentApparatus} onOk={onDoneClick} open={isOpen} onCancel={() => setIsOpen(false)}>
          <h3 style={{marginTop: '10px', fontSize: '13px'}}>Enter {currentApparatus} name or leave it blank to just have {currentApparatus?.charAt(0).toUpperCase()} as Label.</h3>
          <Input style={{width: '100%'}} onChange={onLblChange} placeholder={currentApparatus + " Name"}/>
    </Modal>)
}

export default AppratusLblPopup;