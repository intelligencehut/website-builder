export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  dropdown?: NavigationItem[];
}

export interface MobileMenuState {
  isOpen: boolean;
  activeDropdown: string | null;
}

export interface DropdownState {
  activeDesktopDropdown: string | null;
  activeMobileDropdown: string | null;
}
