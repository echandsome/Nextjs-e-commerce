"use client";
import { ElementRef, useRef, useState } from "react";
import styles from "./addCategory.module.scss";
import Button from "@/components/UI/button";
import { addGroup, TCategoryGroup } from "@/actions/category/addCategory";
import Popup from "@/components/UI/popup";
import GroupCategory from "../../forms/groupCategory";

type ShowMenu = {
  showWindow: boolean;
  windowTypeID: number;
};

interface IProps {
  onReset: () => void;
}

const AddCategory = ({ onReset }: IProps) => {
  const [showWindow, setShowWindow] = useState<ShowMenu>({
    showWindow: false,
    windowTypeID: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [groupCategoryData, setGroupCategory] = useState<TCategoryGroup>({
    name: "",
    url: "",
    iconSize: [10, 10],
    iconUrl: "",
  });

  const windowContent: React.ReactNode[] = [
    <GroupCategory
      errorMsg={errorMsg}
      data={groupCategoryData}
      onChange={setGroupCategory}
    />,
    <div className={styles.addCategory}>
      <div className={styles.header}>Add new category</div>
    </div>,
    <div className={styles.addSubCategory}>
      <div className={styles.header}>Add new sub category</div>
    </div>,
  ];

  const groupNameRef = useRef<ElementRef<"form">>(null);

  const handleAddGroup = async () => {
    const { name, url, iconUrl, iconSize } = groupCategoryData;
    if (name === "") {
      setErrorMsg("Name is empty!");
      return;
    }
    if (iconSize[0] === 0 || iconSize[1] === 0) {
      setErrorMsg("Icon Size is empty!");
      return;
    }
    if (iconUrl === "") {
      setErrorMsg("Icon Url is empty!");
      return;
    }
    if (url === "") {
      setErrorMsg("URL is empty!");
      return;
    }

    setButtonDisabled(true);
    const res = await addGroup(groupCategoryData);
    if (res) {
      setGroupCategory({
        name: "",
        url: "",
        iconSize: [10, 10],
        iconUrl: "",
      });
      setButtonDisabled(false);
      setErrorMsg("");
      setShowWindow({ showWindow: false, windowTypeID: 0 });
      onReset();
    } else {
      setButtonDisabled(false);
      setErrorMsg("Can't Insert it to Database!");
    }
  };

  return (
    <div className={styles.addCategory}>
      <Button
        onClick={() => setShowWindow({ showWindow: true, windowTypeID: 0 })}
        text="Add Group"
      />
      <Button
        onClick={() => setShowWindow({ showWindow: true, windowTypeID: 1 })}
        text="Add Category"
      />
      <Button
        onClick={() => setShowWindow({ showWindow: true, windowTypeID: 2 })}
        text="Add Sub Category"
      />
      {showWindow.showWindow && (
        <Popup
          content={windowContent[showWindow.windowTypeID]}
          isLoading={buttonDisabled}
          onCancel={() => setShowWindow({ showWindow: false, windowTypeID: 0 })}
          onClose={() => setShowWindow({ showWindow: false, windowTypeID: 0 })}
          onSubmit={() => handleAddGroup()}
          title="Add Category Group"
        />
      )}
    </div>
  );
};

export default AddCategory;
