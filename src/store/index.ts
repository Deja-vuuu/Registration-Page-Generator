import { create } from 'zustand';
import {
  RegistrationInfo,
  RegistrationTemplate,
  PageStyle,
  UserSettings,
  STORAGE_KEYS,
  DEFAULT_REGISTRATION_INFO
} from '../types';

// 工具函数
const generateId = () => Math.random().toString(36).substr(2, 9);
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('保存到本地存储失败:', error);
  }
};
const loadFromLocalStorage = <T = any>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('从本地存储加载失败:', error);
    return null;
  }
};

interface AppState {
  // 挂号信息
  registrationInfo: RegistrationInfo;

  // 页面样式
  pageStyle: PageStyle;


  // 用户设置
  userSettings: UserSettings;

  // 导出状态
  isExporting: boolean;

  // Actions
  updateRegistrationInfo: (info: Partial<RegistrationInfo>) => void;
  updatePageStyle: (style: Partial<PageStyle>) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  setExporting: (isExporting: boolean) => void;
  resetToDefault: () => void;

  // 模板操作
  saveAsTemplate: (name: string) => RegistrationTemplate;
  loadTemplate: (template: RegistrationTemplate) => void;

  // 持久化
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  registrationInfo: DEFAULT_REGISTRATION_INFO,
  // 直接写死页面样式
  pageStyle: {
    primaryColor: '#4A90E2',
    backgroundColor: '#F5F5F5',
    fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
  },
  userSettings: {
    theme: 'light',
    autoSave: true,
    exportQuality: 0.9,
    defaultHospital: '北京大学人民医院',
    defaultDepartment: '感染科门诊'
  },
  isExporting: false,

  // Actions
  updateRegistrationInfo: (info: Partial<RegistrationInfo>) => {
    const state = get();
    const updatedInfo = { ...state.registrationInfo, ...info };
    set({ registrationInfo: updatedInfo });

    if (state.userSettings.autoSave) {
      get().saveToStorage();
    }
  },

  updatePageStyle: (style: Partial<PageStyle>) => {
    const state = get();
    const updatedStyle = { ...state.pageStyle, ...style };
    set({ pageStyle: updatedStyle });

    if (state.userSettings.autoSave) {
      get().saveToStorage();
    }
  },



  updateUserSettings: (settings: Partial<UserSettings>) => {
    const state = get();
    const updatedSettings = { ...state.userSettings, ...settings };
    set({ userSettings: updatedSettings });
    saveToLocalStorage(STORAGE_KEYS.USER_SETTINGS, updatedSettings);
  },

  setExporting: (isExporting: boolean) => {
    set({ isExporting });
  },

  resetToDefault: () => {
    set({
      registrationInfo: DEFAULT_REGISTRATION_INFO,
      // 直接写死页面样式
      pageStyle: {
        primaryColor: '#4A90E2',
        backgroundColor: '#F5F5F5',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
      },
    });
    get().saveToStorage();
  },

  // 模板操作
  saveAsTemplate: (name: string): RegistrationTemplate => {
    const state = get();
    const template: RegistrationTemplate = {
      id: generateId(),
      name,
      registrationInfo: state.registrationInfo,
      pageStyle: state.pageStyle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return template;
  },

  loadTemplate: (template: RegistrationTemplate) => {
    set({
      registrationInfo: template.registrationInfo,
      pageStyle: template.pageStyle
    });
    get().saveToStorage();
  },

  // 持久化方法
  saveToStorage: () => {
    const state = get();
    const dataToSave = {
      registrationInfo: state.registrationInfo,
      pageStyle: state.pageStyle,
    };
    saveToLocalStorage(STORAGE_KEYS.CURRENT_REGISTRATION, dataToSave);
  },

  loadFromStorage: () => {
    const savedData = loadFromLocalStorage<{
      registrationInfo: RegistrationInfo;
      pageStyle: PageStyle;
    }>(STORAGE_KEYS.CURRENT_REGISTRATION);

    const savedSettings = loadFromLocalStorage<UserSettings>(STORAGE_KEYS.USER_SETTINGS);

    if (savedData) {
      set({
        registrationInfo: savedData.registrationInfo || DEFAULT_REGISTRATION_INFO,
        pageStyle: savedData.pageStyle || {
          // 直接写死页面样式
          primaryColor: '#4A90E2',
          backgroundColor: '#F5F5F5',
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
        },
      });
    }

    if (savedSettings) {
      set({ userSettings: savedSettings });
    }
  }
}));

export default useAppStore;
export { useAppStore };