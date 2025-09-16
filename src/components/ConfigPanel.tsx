import React, { useEffect } from "react";
import FormRender, { useForm } from "form-render";
import { useAppStore } from "../store";

interface ConfigPanelProps {
  // 不需要props，直接使用store
}

const ConfigPanel: React.FC<ConfigPanelProps> = () => {
  const form = useForm();
  const { registrationInfo, updateRegistrationInfo } = useAppStore();

  // form-render schema配置
  const schema = {
    type: "object",
    displayType: "column",
    properties: {
      patientName: {
        title: "就诊人姓名",
        type: "string",
        placeholder: "请输入就诊人姓名",
        required: true,
      },
      idNumber: {
        title: "身份证号码",
        type: "string",
        placeholder: "请输入身份证号码",
        required: true,
      },
      appointmentDate: {
        title: "就诊日期",
        type: "string",
        widget: "datePicker",
        required: true,
      },
      appointmentTime: {
        title: "就诊时间",
        type: "range",
        required: true,
        widget: "timeRange",
        props: {
          format: "HH:mm",
        },
      },
      hospital: {
        title: "医院名称",
        type: "string",
        placeholder: "请输入医院名称",
        required: true,
      },
      department: {
        title: "科室名称",
        type: "string",
        placeholder: "请输入科室名称",
        required: true,
      },
      idType: {
        title: "挂号证件",
        type: "string",
        enum: ["居民身份证", "护照", "港澳通行证", "台胞证"],
        enumNames: ["居民身份证", "护照", "港澳通行证", "台胞证"],
        default: "居民身份证",
      },
      registrationType: {
        title: "就诊类型",
        type: "string",
        enum: ["自费", "医保", "公费"],
        enumNames: ["自费", "医保", "公费"],
        default: "自费",
      },
    },
  };

  const handleFormChange = {
    // # 为全局
    "#": () => {
      const value = form.getValues(true);
      console.log("value", value);

      updateRegistrationInfo(value);
    },
  };

  useEffect(() => {
    form.setValues(registrationInfo);
  }, [registrationInfo, form]);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <FormRender
          form={form}
          schema={schema}
          watch={handleFormChange}
          displayType="row"
          labelWidth="120px"
          onMount={() => console.log("FormRender mounted")}
        />
      </div>
    </div>
  );
};

export default ConfigPanel;
