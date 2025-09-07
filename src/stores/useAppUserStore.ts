import { PatientDto, UserDto } from "@/client";
import { createAppStore } from "./base";

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  userInfo?: UserDto | null;
  updateUserInfo: (value: UserDto) => void;
  patientList: PatientDto[];
  updatePatientList: (value: PatientDto[]) => void;
  currentPatient?: PatientDto | null;
  setCurrentPatient: (value: PatientDto) => void;
  /** 复诊列表 */
  subsequentVisitList: any[];
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
    userInfo: null,
    patientList: [],
    currentPatient: null,
    subsequentVisitList: [],
    updateUserInfo: (value: UserDto) => {
      set({ userInfo: value });
    },
    updatePatientList: (value: PatientDto[]) => {
      if (value.length === 0) {
        set({ currentPatient: value[0] });
      }
      set({ patientList: value });
    },
    setCurrentPatient: (value: PatientDto) => {
      set({ currentPatient: value });
    },
  }),
  "appUser",
);
