// 挂号信息接口
export interface RegistrationInfo {
  patientName: string; // 就诊人姓名
  idNumber: string; // 身份证号码
  appointmentDate: string; // 就诊日期
  appointmentTime: string[]; // 就诊时间段
  hospital: string; // 就诊医院
  department: string; // 就诊科室
  idType: string; // 挂号证件类型
  registrationType: string; // 就诊类型（自费/医保等）
}

// 挂号页面模板接口
export interface RegistrationTemplate {
  id: string;
  name: string;
  registrationInfo: RegistrationInfo;
  pageStyle: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 页面样式接口
export interface PageStyle {
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
}

// 导出配置接口
export interface ExportConfig {
  format: 'png' | 'jpg' | 'webp';
  quality: number; // 0-1
  width?: number;
  height?: number;
  scale: number; // 1-3
}

// 导出结果接口
export interface ExportResult {
  success: boolean;
  dataUrl?: string;
  blob?: Blob;
  error?: string;
}

// 用户设置接口
export interface UserSettings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  exportQuality: number;
  defaultHospital: string;
  defaultDepartment: string;
}

// 项目数据接口
export interface ProjectData {
  registrationInfo: RegistrationInfo;
  pageStyle: PageStyle;
}

// 存储键值常量
export const STORAGE_KEYS = {
  CURRENT_REGISTRATION: 'registration_generator_current',
  USER_SETTINGS: 'registration_generator_settings'
} as const;

// 默认挂号信息
export const DEFAULT_REGISTRATION_INFO: RegistrationInfo = {
  patientName: '张三',
  idNumber: '130****13',
  appointmentDate: '2025年09月17日 周三',
  appointmentTime: ['09:30', '10:00'],
  hospital: '北京大学人民医院',
  department: '感染科门诊',
  idType: '居民身份证',
  registrationType: '自费'
};
