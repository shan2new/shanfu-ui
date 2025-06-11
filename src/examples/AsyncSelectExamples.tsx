import { useState } from "react";
import { 
  AsyncSelect, 
  AsyncCreatableSelect, 
  InlineAsyncSelect, 
  InlineAsyncCreatableSelect,
  Option 
} from "../index";

// Example data types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

// Mock API functions
const searchUsers = async (query?: string): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
    { id: "4", name: "Alice Brown", email: "alice@example.com" },
  ];
  
  if (!query) return users;
  
  return users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
};

const searchTags = async (query?: string): Promise<Tag[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const tags: Tag[] = [
    { id: "1", name: "frontend", color: "blue" },
    { id: "2", name: "backend", color: "green" },
    { id: "3", name: "ui", color: "purple" },
    { id: "4", name: "api", color: "orange" },
  ];
  
  if (!query) return tags;
  
  return tags.filter(tag => 
    tag.name.toLowerCase().includes(query.toLowerCase())
  );
};

const createTag = async (name: string): Promise<Tag> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Date.now().toString(),
    name: name.toLowerCase(),
    color: "gray"
  };
};

/**
 * Example usage of AsyncSelect components.
 * 
 * NOTE: In your actual implementation, you'll need to import the shadcn components
 * and pass them as props. For example:
 * 
 * import { Button } from "@/components/ui/button";
 * import { 
 *   Popover, 
 *   PopoverContent, 
 *   PopoverTrigger 
 * } from "@/components/ui/popover";
 * import {
 *   Command,
 *   CommandEmpty,
 *   CommandGroup,
 *   CommandInput,
 *   CommandItem,
 *   CommandList,
 * } from "@/components/ui/command";
 * 
 * Then use them like:
 * <AsyncSelect
 *   ButtonComponent={Button}
 *   PopoverComponent={Popover}
 *   PopoverContentComponent={PopoverContent}
 *   PopoverTriggerComponent={PopoverTrigger}
 *   CommandComponent={Command}
 *   CommandEmptyComponent={CommandEmpty}
 *   CommandGroupComponent={CommandGroup}
 *   CommandInputComponent={CommandInput}
 *   CommandItemComponent={CommandItem}
 *   CommandListComponent={CommandList}
 *   // ... other props
 * />
 */
export function AsyncSelectExamples() {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [inlineUser, setInlineUser] = useState("1");
  const [inlineTag, setInlineTag] = useState("");

  // Mock shadcn components for demonstration
  const MockButton = ({ children, ...props }: any) => (
    <button {...props} className="flex items-center gap-2 px-3 py-2 border rounded">
      {children}
    </button>
  );
  
  const MockPopover = ({ children, open, onOpenChange }: any) => (
    <div className="relative">
      {children}
    </div>
  );

  const MockPopoverTrigger = ({ children }: any) => children;
  const MockPopoverContent = ({ children, style }: any) => (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg" style={style}>
      {children}
    </div>
  );

  const MockCommand = ({ children }: any) => <div>{children}</div>;
  const MockCommandInput = ({ placeholder, value, onValueChange }: any) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full p-2 border-b"
    />
  );
  const MockCommandList = ({ children }: any) => <div className="max-h-48 overflow-auto">{children}</div>;
  const MockCommandEmpty = ({ children }: any) => <div className="p-2 text-gray-500">{children}</div>;
  const MockCommandGroup = ({ children }: any) => <div>{children}</div>;
  const MockCommandItem = ({ children, onSelect, value }: any) => (
    <div
      className="p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">AsyncSelect Examples</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> These examples use mock components for demonstration. 
          In your actual implementation, you'll need to pass the real shadcn/ui components as props.
        </p>
      </div>
      
      {/* Basic AsyncSelect */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic AsyncSelect - User Selection</h3>
        <AsyncSelect<User>
          fetcher={searchUsers}
          value={selectedUser}
          onChange={setSelectedUser}
          label="Users"
          placeholder="Search users..."
          getOptionValue={(user) => user.id}
          getDisplayValue={(user) => user.name}
          renderOption={(user) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
          )}
          width="300px"
          // Shadcn Component Props
          ButtonComponent={MockButton}
          PopoverComponent={MockPopover}
          PopoverContentComponent={MockPopoverContent}
          PopoverTriggerComponent={MockPopoverTrigger}
          CommandComponent={MockCommand}
          CommandEmptyComponent={MockCommandEmpty}
          CommandGroupComponent={MockCommandGroup}
          CommandInputComponent={MockCommandInput}
          CommandItemComponent={MockCommandItem}
          CommandListComponent={MockCommandList}
        />
        <p className="text-sm text-gray-600">
          Selected user ID: {selectedUser || "None"}
        </p>
      </div>

      {/* AsyncCreatableSelect */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AsyncCreatableSelect - Tag Selection</h3>
        <AsyncCreatableSelect<Tag>
          fetcher={searchTags}
          onCreateOption={createTag}
          value={selectedTag}
          onChange={setSelectedTag}
          label="Tags"
          placeholder="Search or create tags..."
          getOptionValue={(tag) => tag.id}
          getDisplayValue={(tag) => tag.name}
          renderOption={(tag) => (
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: tag.color }}
              />
              <span>{tag.name}</span>
            </div>
          )}
          createMessage={(input) => `Create tag "${input}"`}
          width="250px"
          // Shadcn Component Props
          ButtonComponent={MockButton}
          PopoverComponent={MockPopover}
          PopoverContentComponent={MockPopoverContent}
          PopoverTriggerComponent={MockPopoverTrigger}
          CommandComponent={MockCommand}
          CommandEmptyComponent={MockCommandEmpty}
          CommandGroupComponent={MockCommandGroup}
          CommandInputComponent={MockCommandInput}
          CommandItemComponent={MockCommandItem}
          CommandListComponent={MockCommandList}
        />
        <p className="text-sm text-gray-600">
          Selected tag ID: {selectedTag || "None"}
        </p>
      </div>

      {/* Code Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Example</h3>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AsyncSelect } from "@inline-edit/ui";

<AsyncSelect<User>
  fetcher={searchUsers}
  value={selectedUser}
  onChange={setSelectedUser}
  label="Users"
  placeholder="Search users..."
  getOptionValue={(user) => user.id}
  getDisplayValue={(user) => user.name}
  renderOption={(user) => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        {user.name.charAt(0)}
      </div>
      <span>{user.name}</span>
    </div>
  )}
  // Required shadcn component props
  ButtonComponent={Button}
  PopoverComponent={Popover}
  PopoverContentComponent={PopoverContent}
  PopoverTriggerComponent={PopoverTrigger}
  CommandComponent={Command}
  CommandEmptyComponent={CommandEmpty}
  CommandGroupComponent={CommandGroup}
  CommandInputComponent={CommandInput}
  CommandItemComponent={CommandItem}
  CommandListComponent={CommandList}
/>`}
        </pre>
      </div>
    </div>
  );
} 