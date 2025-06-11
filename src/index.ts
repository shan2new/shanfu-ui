// =============================================================================
// INLINE EDITING COMPONENTS
// =============================================================================
// Components that provide click-to-edit functionality with save/cancel actions

export { InlineEditText } from "./components/inline-edit-text/InlineEditText";
export type { InlineEditTextProps } from "./components/inline-edit-text/InlineEditText";

export { InlineEditTextarea } from "./components/inline-edit-textarea/InlineEditTextarea";
export type { InlineEditTextareaProps } from "./components/inline-edit-textarea/InlineEditTextarea";

export { InlineEditSelect } from "./components/inline-edit-select/InlineEditSelect";
export type { InlineEditSelectProps, InlineEditSelectOption } from "./components/inline-edit-select/InlineEditSelect";

export { InlineAsyncSelect } from "./components/inline-async-select/InlineAsyncSelect";
export type { InlineAsyncSelectProps } from "./components/inline-async-select/InlineAsyncSelect";

export { InlineAsyncCreatableSelect } from "./components/inline-async-creatable-select/InlineAsyncCreatableSelect";
export type { InlineAsyncCreatableSelectProps } from "./components/inline-async-creatable-select/InlineAsyncCreatableSelect";

// Legacy inline components (use InlineEdit* variants for new projects)
export { InlineText } from "./components/inline-text/InlineText";
export { InlineField } from "./components/inline-field/InlineField";
export type { EditorState } from "./components/inline-field/InlineField";

// =============================================================================
// ENHANCED FORM CONTROLS
// =============================================================================
// Enhanced versions of basic form elements with additional features

export { EnhancedInput } from "./components/enhanced-input/EnhancedInput";
export type { EnhancedInputProps } from "./components/enhanced-input/EnhancedInput";

export { EnhancedTextarea } from "./components/enhanced-textarea/EnhancedTextarea";
export type { EnhancedTextareaProps } from "./components/enhanced-textarea/EnhancedTextarea";

// =============================================================================
// ASYNC & DYNAMIC COMPONENTS
// =============================================================================
// Components with async data loading and dynamic content capabilities

export { AsyncSelect } from "./components/async-select/AsyncSelect";
export type { AsyncSelectProps, Option } from "./components/async-select/AsyncSelect";

export { AsyncCreatableSelect } from "./components/async-select/AsyncCreatableSelect";
export type { AsyncCreatableSelectProps } from "./components/async-select/AsyncCreatableSelect";

// =============================================================================
// UI PRIMITIVES & BUILDING BLOCKS
// =============================================================================
// Basic UI components that serve as building blocks for complex interfaces

export { Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Badge } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/ui/dropdown-menu";

// =============================================================================
// THEME & LAYOUT SYSTEM
// =============================================================================
// Theme management, navigation, and layout components for complete applications

export { ThemeProvider, useTheme } from "./components/theme-provider";
export { ThemeToggle } from "./components/theme-toggle";
export { Navigation, SidebarNavigation } from "./components/navigation";
export type { NavigationProps, SidebarNavigationProps } from "./components/navigation";
export { Layout } from "./components/layout";
export type { LayoutProps } from "./components/layout";

export * from "./lib/utils";
export * from "./lib/hooks"; 