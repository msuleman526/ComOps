import { Avatar, List, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const ApparatusPopup = ({ isOpen, setIsOpen, selectApparatus }) => {
  let [selectedApparatusIndex, setSelectedApparatusIndex] = useState(-1);
  let [selectedChildApparatus, setSelectedChildApparatus] = useState(null);
  let apparatusType = ["Fire", "EMS", "Police", "Air Care"];
  let options = [
    [
      {
        name: "Engine",
        image: "/assets/images/fire/engine.png",
        children: false,
      },
      {
        name: "Ladder",
        image: "/assets/images/fire/ladder.png",
        children: false,
      },
      {
        name: "Tiller",
        image: "/assets/images/fire/tiller.png",
        children: false,
      },
      {
        name: "Tanker",
        image: "/assets/images/fire/tanker.png",
        children: false,
      },
      {
        name: "Squad",
        image: "/assets/images/fire/squad.png",
        children: false,
      },
      {
        name: "ATV/UTV",
        image: "/assets/images/fire/atv.png",
        children: false,
      },
      {
        name: "Brush",
        image: "/assets/images/fire/brush.png",
        children: false,
      },
      {
        name: "Rescue",
        image: "/assets/images/fire/rescue.png",
        children: false,
      },
      {
        name: "Hazmat",
        image: "/assets/images/fire/hazmat.png",
        children: false,
      },
      {
        name: "Command",
        image: "/assets/images/fire/command/fire-command.png",
        children: true,
        childs: [
          {
            name: "SUV",
            image: "/assets/images/fire/command/tahoe.png",
            children: false,
          },
          {
            name: "RV",
            image: "/assets/images/fire/command/fire-command.png",
            children: false,
          },
        ],
      },
      {
        name: "Boat",
        image: "/assets/images/fire/boats/boat.png",
        children: true,
        childs: [
          {
            name: "Zodiac",
            image: "/assets/images/fire/boats/Zodiac_Boat.png",
            children: false,
          },
          {
            name: "Flat Bottom",
            image: "/assets/images/fire/boats/Flat_bottom_boat.png",
            children: false,
          },
          {
            name: "Center Console",
            image: "/assets/images/fire/boats/boat.png",
            children: false,
          },
          {
            name: "Fire Boat",
            image: "/assets/images/fire/boats/Fire Boat.png",
            children: false,
          },
        ],
      },
    ],
    [
      {
        name: "Ambulance",
        image: "/assets/images/fire/ambulance.png",
        children: false,
      },
    ],
    [
      {
        name: "Car",
        image: "/assets/images/fire/police_car.png",
        children: false,
      },
      {
        name: "Command",
        image: "/assets/images/fire/police_suv.png",
        children: true,
        childs: [
          {
            name: "SUV",
            image: "/assets/images/fire/police_suv.png",
            children: false,
          },
          {
            name: "RV",
            image: "/assets/images/fire/command/Police_Command_RV.png",
            children: false,
          },
        ],
      },
      {
        name: "Boat",
        image: "/assets/images/fire/boats/boat.png",
        children: true,
        childs: [
          {
            name: "Zodiac",
            image: "/assets/images/fire/boats/Zodiac_Boat.png",
            children: false,
          },
          {
            name: "Flat Bottom",
            image: "/assets/images/fire/boats/Flat_bottom_boat.png",
            children: false,
          },
          {
            name: "Center Console",
            image: "/assets/images/fire/boats/boat.png",
            children: false,
          },
        ],
      },
      {
        name: "Air",
        image: "/assets/images/fire/Police_Helicopter.png",
        children: false,
      },
    ],
    [
      {
        name: "Air Support",
        image: "/assets/images/fire/EMS_Helicopter.png",
        children: false,
      },
    ],
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedApparatusIndex(-1);
      setSelectedChildApparatus(null);
    }
  }, [isOpen]);

  const onChildChangeApparatus = (val) => {
    let apparatus = selectedChildApparatus.childs[val];
    selectApparatus(apparatus);
    setSelectedChildApparatus(null);
    setSelectedApparatusIndex(-1);
    setIsOpen(false);
  };

  const onApparatusTypeChange = (val) => {
    setSelectedApparatusIndex(val);
    setSelectedChildApparatus(null);
  };

  let onApparatusChange = (index) => {
    let apparatus = options[selectedApparatusIndex][index];
    if (apparatus.children) {
      console.log(apparatus);
      setSelectedChildApparatus(apparatus);
    } else {
      selectApparatus(apparatus);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      title="Choose Appratus"
      footer=""
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <h3 style={{ marginTop: "10px", fontSize: "13px" }}>
        Select Apparatus Type
      </h3>
      <Select
        style={{ width: "100%" }}
        showSearch
        value={
          selectedApparatusIndex == -1
            ? "Apparatus Type"
            : selectedApparatusIndex
        }
        placeholder="Select Apparatus Type"
        optionFilterProp="children"
        onChange={onApparatusTypeChange}
      >
        {apparatusType.map((type, index) => {
          return <Select.Option value={index}>{type}</Select.Option>;
        })}
      </Select>

      {selectedApparatusIndex != -1 && (
        <>
          <h3 style={{ marginTop: "10px", fontSize: "13px" }}>
            Select {apparatusType[selectedApparatusIndex]}
          </h3>
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder={"Select " + apparatusType[selectedApparatusIndex]}
            optionFilterProp="children"
            onChange={onApparatusChange}
          >
            {options[selectedApparatusIndex].map((apparatus, index) => {
              return (
                <Select.Option value={index}>
                  <List.Item.Meta
                    style={{
                      display: "inline-flex",
                      gap: "5px",
                      paddingBottom: "2px",
                    }}
                    avatar={
                      <Avatar
                        style={{ width: "28px", height: "28px" }}
                        src={apparatus.image}
                      />
                    }
                    title={apparatus.name}
                  />
                </Select.Option>
              );
            })}
          </Select>
        </>
      )}

      {selectedChildApparatus != null && (
        <>
          <h3 style={{ marginTop: "10px", fontSize: "13px" }}>
            Select {selectedChildApparatus.name}
          </h3>
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder={"Select " + selectedChildApparatus.name}
            optionFilterProp="children"
            onChange={onChildChangeApparatus}
          >
            {selectedChildApparatus.childs.map((apparatus, index) => {
              return (
                <Select.Option value={index}>
                  <List.Item.Meta
                    style={{
                      display: "inline-flex",
                      gap: "5px",
                      paddingBottom: "2px",
                    }}
                    avatar={
                      <Avatar
                        style={{ width: "28px", height: "28px" }}
                        src={apparatus.image}
                      />
                    }
                    title={apparatus.name}
                  />
                </Select.Option>
              );
            })}
          </Select>
        </>
      )}
    </Modal>
  );
};

export default ApparatusPopup;
