/**=======================
 * SUB ADMIN INTERFACES
 =======================*/
export interface SubAdmin {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface SubAdminListPayload {
  admins: SubAdmin[];
  hasMore: boolean;
  totalAdmins: number;
  currentPage: number;
  totalPages: number;
}

export interface SubAdminResponse {
  status: string;
  data: SubAdminListPayload;
}

export interface SubAdminFormData {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
}

export interface SubAdminFormProps {
  onCreateAdmin: (data: SubAdminFormData) => void;
}

export interface EditSubAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: SubAdmin;
  onUpdate: (arg1: string, arg2: SubAdminFormData) => void;
}

export interface DynamicAdminConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionState: AdminActionState | null;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface ActionDropdownProps {
  status: 'ACTIVE' | 'SUSPENDED';
  onStatusChange: () => void;
}

export interface AdminActionState {
  fullName: string;
  email: string;
  currentStatus: 'ACTIVE' | 'SUSPENDED';
  actionType: 'SUSPEND' | 'ACTIVATE';
}

export interface AdminFilterState {
  role: 'SUPER' | 'SUB' | '';
}

export interface AdminFiltersProps {
  filters: AdminFilterState;
  onFilterChange: (key: keyof AdminFilterState, value: string) => void;
  onResetFilters: () => void;
}
