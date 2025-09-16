import { useEffect } from "react";
import { useAppStore } from "./store";
import ConfigPanel from "./components/ConfigPanel";
import PreviewArea from "./components/PreviewArea";
import { Download, FileText, Settings } from "lucide-react";
import { snapdom } from "@zumer/snapdom";

function App() {
  const { loadFromStorage } = useAppStore();

  // 初始化应用
  useEffect(() => {
    // 应用初始化逻辑
    loadFromStorage();
  }, [loadFromStorage]);

  const handleExport = async () => {
    const el = document.querySelector("#target") as HTMLElement;
    const result = await snapdom(el);

    const img = await result.toPng();
    document.body.appendChild(img);

    await result.download({ format: "jpg", filename: "my-capture" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">
              挂号页面生成器
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>导出图片</span>
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容区域 - 左右分栏 */}
      <div className="flex-1 flex">
        {/* 左侧预览区域 */}
        <div className="flex-1">
          <PreviewArea />
        </div>

        {/* 右侧配置面板 */}
        <div className="w-80 bg-white  border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-800">
                挂号信息配置
              </h2>
            </div>
          </div>
          <ConfigPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
