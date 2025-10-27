import { Board, BoardCategories, BoardListItem } from './board';

export interface NotificationProps {
  message: string;
  type: 'error' | 'warning' | 'success';
  onClose: () => void;
  duration?: number;
}

export interface CustomDropdownProps {
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: string | number) => void;
  className?: string;
}

export interface BoardDetailProps {
  board: Board;
  categories: BoardCategories | null;
  user: any;
  showActionModal: boolean;
  onActionModalToggle: () => void;
  onEdit: (board: Board) => void;
  onDelete: (boardId: number) => Promise<void>;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export interface BoardListProps {
  boards: BoardListItem[];
  categories: BoardCategories | null;
  user: any;
  isLoading: boolean;
}

export interface BoardSkeletonProps {
  count?: number;
}

export interface WriteModalProps {
  isOpen: boolean;
  isEditing: boolean;
  isLoading: boolean;
  formData: any;
  selectedFile: File | null;
  categories: any;
  board?: Board | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormDataChange: any;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BoardHeaderProps {
  totalElements: number;
  categories: BoardCategories | null;
  selectedCategory: string;
  onCategoryChange: (newCategory: string) => void;
  onNewPostClick: () => void;
  onBackToList: () => void;
  showForm: boolean;
  isLoading: boolean;
  currentBoard: any;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}
