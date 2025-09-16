import React, { useRef } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "../store";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入中文语言包

dayjs.locale("zh-cn"); // 设置语言为中文

const RegistrationSuccessPage: React.FC = () => {
  const { registrationInfo } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);

  // 处理日期和周几的函数
  const formatDateWithWeekday = (dateStr: string) => {
    // 如果日期已经包含周几信息，则直接返回
    if (dateStr.includes("周")) return dateStr;

    // 尝试解析日期
    const date = dayjs(
      dateStr.replace(/年|月|日/g, (match) => {
        if (match === "年") return "-";
        if (match === "月") return "-";
        return "";
      })
    );

    // 如果解析成功，添加周几信息
    if (date.isValid()) {
      const weekdayMap: Record<number, string> = {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
      };
      const weekday = weekdayMap[date.day()];
      return `${dateStr} 周${weekday}`;
    }

    // 如果解析失败，返回原始日期
    return dateStr;
  };

  return (
    <div
      ref={contentRef}
      className="w-full h-full bg-white relative overflow-hidden"
      id="target"
      style={{
        backgroundColor: "#F5F5F5",
        fontFamily: "PingFang SC, Microsoft YaHei, sans-serif",
      }}
    >
      {/* 顶部导航栏 */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        <ChevronLeft className="w-5 h-5 text-blue-500" />
        <div className="text-center flex-1">
          <div className="text-base font-medium" style={{ color: "#333" }}>
            订单详情
          </div>
        </div>
      </div>

      {/* 蓝色提示条 */}
      <div
        className="w-full px-4 py-1 text-center"
        style={{
          background: "linear-gradient(180deg,#83b2f9,#abcaf8)",
          color: "#fff",
          fontWeight: 400,
          fontSize: "12px",
        }}
      >
        便捷挂号就医 守护您的健康
      </div>

      {/* 预约成功状态 */}
      <div className="flex items-center justify-start py-6 px-4 bg-white shadow-sm">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-500">
          <Check className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-medium text-blue-500">预约成功</span>
      </div>

      {/* 挂号信息 */}
      <div className=" px-4 py-3">
        <h3 className="text-gray-600 text-sm mb-3 text-left">挂号信息</h3>

        {/* 就诊人和身份证信息盒子 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">就诊人</span>
              <span style={{ color: "#333" }}>
                {registrationInfo.patientName}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">居民身份证</span>
              <span style={{ color: "#333" }}>
                {registrationInfo.idNumber
                  ? `${registrationInfo.idNumber.substring(
                      0,
                      3
                    )}****${registrationInfo.idNumber.substring(
                      registrationInfo.idNumber.length - 2
                    )}`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* 其他挂号信息 */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">就诊日期</span>
            <div className="text-right">
              <div style={{ color: "#333" }}>
                {formatDateWithWeekday(registrationInfo.appointmentDate)}
              </div>
              <div className="text-gray-600 text-sm">
                {registrationInfo.appointmentTime[0]}~
                {registrationInfo.appointmentTime[1]}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">就诊医院</span>
            <span style={{ color: "#333" }}>{registrationInfo.hospital}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">就诊科室</span>
            <span style={{ color: "#333" }}>{registrationInfo.department}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">挂号证件</span>
            <span style={{ color: "#333" }}>{registrationInfo.idType}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">就诊类型</span>
            <span style={{ color: "#333" }}>
              {registrationInfo.registrationType}
            </span>
          </div>
        </div>
      </div>

      {/* 回首页按钮和导出按钮 */}
      <div className="px-4 py-6 space-y-3">
        <button className="w-full py-3 rounded-lg text-white font-medium bg-blue-500">
          回首页
        </button>
      </div>

      {/* 底部导航 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-4 bg-white border-t border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-400" />
        <ChevronRight className="w-6 h-6 text-gray-400 ml-8" />
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
