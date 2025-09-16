import React from "react";
import RegistrationSuccessPage from "./RegistrationSuccessPage";

interface PreviewAreaProps {
  // 不需要props，直接显示挂号页面
}

const PreviewArea: React.FC<PreviewAreaProps> = () => {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-md mx-auto">
        {/* 手机框架 */}
        <div className="relative mx-auto" style={{ width: "375px" }}>
          {/* 手机外框 */}
          <div className="bg-black rounded-3xl p-2 shadow-2xl">
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ height: "812px" }}
            >
              <RegistrationSuccessPage />
            </div>
          </div>

          {/* 手机按钮装饰 */}
          <div className="absolute -left-1 top-20 w-1 h-8 bg-black rounded-r"></div>
          <div className="absolute -left-1 top-32 w-1 h-12 bg-black rounded-r"></div>
          <div className="absolute -left-1 top-48 w-1 h-12 bg-black rounded-r"></div>
          <div className="absolute -right-1 top-28 w-1 h-16 bg-black rounded-l"></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
